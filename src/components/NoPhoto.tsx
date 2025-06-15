import { Box, Typography } from '@mui/material';

import { palette } from '@/themes';

const NoPhoto = () => {
    return (
        <Box
            display={'flex'}
            sx={{
                width: '120px',
                height: '160px',
                justifyContent: 'center',
                alignItems: 'center',
                background: palette.grey[100],
            }}
        >
            <Typography>사진 없음</Typography>
        </Box>
    );
};

export default NoPhoto;
