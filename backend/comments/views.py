from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()

    def list(self, request):
        comments = self.get_queryset()
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)
    
    def create(self, request):
        data = request.data.copy()
        data['author'] = 'Admin'
        serializer = CommentSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        comment = self.get_object()
        serializer = CommentSerializer(comment, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def destroy(self, request, pk=None):
        comment = self.get_object()
        comment.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
