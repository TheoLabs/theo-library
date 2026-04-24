import { useMutation } from "@tanstack/react-query";
import { fileRepository } from "../api";

// 1. query keys
// 2. queries
// 3. mutations
export const useFileUpload = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const response = await fileRepository.create(file);
      return response.url;
    },
    onError: (error) => {
      console.error("파일 업로드 중 오류가 발생했습니다:", error);
    },
  });
};

// 4. custom hook
