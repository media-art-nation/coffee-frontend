import { useNavigate } from 'react-router';

import { Stack, Typography } from '@mui/material';

import Logo from '@assets/logo.png';

import { palette } from '@/themes';

export const GNB_HEIGHT = 60;
type GnbProps = {
    isLoginPage: boolean;
};

const Gnb = ({ isLoginPage }: GnbProps) => {
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
                'padding': '0 20px 0 15px',
                'flexDirection': 'row',
                'justifyContent': isLoginPage ? 'center' : 'space-between',
                'alignItems': 'center',
                'height': GNB_HEIGHT,
                'minHeight': GNB_HEIGHT,
            }}
        >
            <Stack
                sx={{
                    height: '40px',
                    width: '75px',
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />
            {isLogin && !isLoginPage && (
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
