import { httpClient } from "@libs/http-client";

export const fileRepository = {
  async create(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return httpClient.post<{ id: number; url: string }>(
      `/files/upload`,
      formData,
    );
  },
};
