import { useNavigate } from 'react-router';

import { Stack, Typography } from '@mui/material';

import { palette } from '@/themes';

export const GNB_HEIGHT = 60;
const Gnb = () => {
    const isLogin = true;
    const navigate = useNavigate();

    const handleClickLogout = () => {};

    return (
        <Stack
            sx={{
                '& .MuiTypography-root': {
                    color: palette.common.white,
                },
                'backgroundColor': palette.blue[500],
                'padding': '0 20px',
                'flexDirection': 'row',
                'justifyContent': 'space-between',
                'alignItems': 'center',
                'height': GNB_HEIGHT,
            }}
        >
            <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>테즈로스팅</Typography>
            {isLogin && (
                <Stack sx={{ flexDirection: 'row', gap: '15px' }}>
                    <Typography>{`{ 아이디 }`}</Typography>
                    <Typography
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate('/my-profile-edit')}
                    >
                        내 정보 수정
                    </Typography>
                    <Typography sx={{ cursor: 'pointer' }} onClick={handleClickLogout}>
                        로그아웃
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
};

export default Gnb;
