from django.core.management.base import BaseCommand
from comments.models import Comment
from datetime import datetime
import json

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('comments', type=str)

    def handle(self, *args, **options):
        comments_file = options['comments']

        with open(comments_file, 'r') as f:
            data = json.load(f)
            comments = data['comments']

            for comment in comments:
                Comment.objects.create(
                    author=comment['author'],
                    text=comment['text'],
                    date=datetime.fromisoformat(comment['date'].replace('Z', '+00:00')),
                    likes=comment['likes'],
                    image=comment.get('image', '')
                )

        self.stdout.write(self.style.SUCCESS(f'Loaded in {len(comments)} comments'))