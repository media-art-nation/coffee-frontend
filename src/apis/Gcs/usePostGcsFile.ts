import { useMutation } from '@tanstack/react-query';

import { axiosInstance } from '@/apis/axiosInstance';
import { GcsDirectoryEnum } from '@/typings/Gcs';


export type PostGcsFileReq = {
    directory: GcsDirectoryEnum;
    file: File;
};

const postGcsFile = async (param: PostGcsFileReq) => {
    return await axiosInstance.post(
        `/gcs/file?directory=${param.directory}`,
        {
            file: param.file,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
};

export const usePostGcsFile = () => {
    return useMutation({
        mutationFn: (param: PostGcsFileReq) => postGcsFile(param),
    });
};
