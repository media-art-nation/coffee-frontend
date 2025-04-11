import React, { useState } from 'react';

import { Button, Chip, Divider, Stack, Typography } from '@mui/material';

import TextArea from '@/components/TextArea';
import Title from '@/components/Title';
import { palette } from '@/themes';

type RequestDetailsLayoutProps = {
    children: React.ReactNode;
};

const RequestDetailsLayout = ({ children }: RequestDetailsLayoutProps) => {
    const [showTextArea, setShowTextArea] = useState(false);
    const [rejectedReason, setRejectedReason] = useState('');

    const handleChangeRejectedReason = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRejectedReason(e.target.value);
    };

    const toggleShowTextArea = () => {
        setShowTextArea((prev) => !prev);
    };

    const handleRejectRequest = () => {
        console.log(rejectedReason);
    };

    return (
        <Stack sx={{ width: '100%' }}>
            <Title title="요청 상세" />
            {/* 요청 기본 정보 */}
            <Stack sx={{ padding: '0 32px', gap: '30px' }}>
                <Stack
                    sx={{
                        'padding': '32px 24px',
                        'flexDirection': 'row',
                        'gap': '32px',
                        'justifyContent': 'space-between',
                        'border': `1px solid ${palette.grey[50]}`,
                        '& > p': {
                            fontSize: '14px',
                        },
                        '& .MuiStack-root': {
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        },
                    }}
                >
                    <Stack>
                        <Typography sx={{ fontWeight: 'bold', color: palette.grey[900] }}>
                            요청 일시
                        </Typography>
                        <Typography>2023. 10. 19 15:23</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack>
                        <Typography sx={{ fontWeight: 'bold', color: palette.grey[900] }}>
                            요청 분류
                        </Typography>
                        <Typography>수매 등록</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack>
                        <Typography sx={{ fontWeight: 'bold', color: palette.grey[900] }}>
                            담당자
                        </Typography>
                        <Typography>담당자 명</Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack>
                        <Typography sx={{ fontWeight: 'bold', color: palette.grey[900] }}>
                            요청 상태
                        </Typography>
                        <Chip color="blue" label="승인" />
                    </Stack>
                </Stack>
                {/* 요청 상세 정보 */}
                {children}
                {/* 승인, 거절 버튼 */}
                {showTextArea ? (
                    <Stack sx={{ gap: '15px' }}>
                        <Typography variant="title/semibold">거절 사유 입력</Typography>
                        <TextArea
                            value={rejectedReason}
                            onChange={handleChangeRejectedReason}
                            placeholder="거절 사유를 입력해주세요."
                        />
                        <Stack
                            sx={{
                                'justifyContent': 'flex-end',
                                'flexDirection': 'row',
                                'gap': '10px',
                                'padding': '10px 0',
                                '& .MuiButton-root': { height: '40px' },
                            }}
                        >
                            <Button variant="containedGrey" onClick={toggleShowTextArea}>
                                취소
                            </Button>
                            <Button variant="containedRed" onClick={handleRejectRequest}>
                                완료
                            </Button>
                        </Stack>
                    </Stack>
                ) : (
                    <Stack
                        sx={{
                            'margin': 'auto',
                            'flexDirection': 'row',
                            'gap': '10px',
                            '& .MuiButton-root': { height: '40px' },
                            'padding': '10px 0',
                        }}
                    >
                        <Button variant="containedRed" onClick={toggleShowTextArea}>
                            거절
                        </Button>
                        <Button variant="containedGrey">승인</Button>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default RequestDetailsLayout;
