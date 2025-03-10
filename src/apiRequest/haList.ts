// services/postService.ts
import axios1 from "@/src/helpers/axios1";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PaginationParams {
  limit: number;
  page: number;
  search?: string;
}

export const postService = {
    async fetchAllPosts(search?: string): Promise<Post[]> {
        try {
          const payload: AxiosRequestConfig = {
            url: "/posts",
            method: "get",
            params: { search },
          };
    
          const response = await axios1(payload);
          return response.data;
        } catch (error) {
          throw new Error("Failed to fetch posts");
        }
      },

  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    try {
      const payload: AxiosRequestConfig = {
        url: "/posts",
        method: "post",
        data: postData,
      };

      const response = await axios1(payload);
      return response.data;
    } catch (error) {
      throw new Error("Failed to create post");
    }
  },

  async updatePost(postData: Post): Promise<Post> {
    try {
      const payload: AxiosRequestConfig = {
        url: `/posts/${postData.id}`,
        method: "put",
        data: {
            ...postData,
            id: postData.id,
        },
      };

      const response = await axios1(payload);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update post");
    }
  },

  async deletePost(postId: number): Promise<AxiosResponse> {
    try {
      const payload: AxiosRequestConfig = {
        url: `/posts/${postId}`,
        method: "delete",
      };

     const response = await axios1(payload);
     return response

     // no return needed for void
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  },
};