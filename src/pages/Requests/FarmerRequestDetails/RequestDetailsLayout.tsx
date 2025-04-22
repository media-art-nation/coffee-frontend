import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { Button, Chip, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { useGetApprovalDetails } from '@/apis/Approval/useGetApprovalDetails';
import TextArea from '@/components/TextArea';
import Title from '@/components/Title';
import { palette } from '@/themes';
import { TChipColor } from '@/typings/Chip';

import { REQUEST_STATUS } from '../constants';

type RequestDetailsLayoutProps = {
    children: React.ReactNode;
};

interface TRequestDetailInput {
    rejectedReason: string;
}

const RequestDetailsLayout = ({ children }: RequestDetailsLayoutProps) => {
    const methods = useForm<TRequestDetailInput>();
    const [showTextArea, setShowTextArea] = useState(false);

    const { id } = useParams();
    const { data: details } = useGetApprovalDetails(id);

    const toggleShowTextArea = () => {
        setShowTextArea((prev) => !prev);
    };

    const handleRejectRequest = () => {
        console.log(methods.getValues('rejectedReason'));
    };

    if (!id) return null;

    console.log(details);

    if (!details) return null;
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
                        <Typography>{dayjs().format('YYYY-MM-DD hh:mm')}</Typography>
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
                        <Chip
                            color={REQUEST_STATUS[details.status].color as TChipColor}
                            label={REQUEST_STATUS[details.status].label}
                        />
                    </Stack>
                </Stack>
                {/* 거절 사유 */}
                {details?.status === 'REJECTED' && (
                    <>
                        <Typography variant="title/semibold">거절 사유</Typography>
                        <Stack
                            sx={{
                                border: `1px solid ${palette.grey[50]}`,
                                padding: '16px',
                                minHeight: '150px',
                            }}
                        >
                            <Typography sx={{ color: palette.grey[700] }}>
                                {details.rejectedReason}
                            </Typography>
                        </Stack>
                    </>
                )}

                {/* 요청 상세 정보 */}
                {children}
                {/* 승인, 거절 버튼 */}
                {details.status !== 'REJECTED' &&
                    (showTextArea ? (
                        <Stack sx={{ gap: '15px' }}>
                            <Typography variant="title/semibold">거절 사유 입력</Typography>
                            <TextArea
                                register={methods.register}
                                fieldName="rejectedReason"
                                placeholder="거절 사유를 입력해주세요."
                            />
                            <Stack
                                sx={{
                                    'justifyContent': 'flex-end',
                                    'flexDirection': 'row',
                                    'gap': '10px',
                                    'padding': '0 0 30px 0',
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
                                'padding': '0 0 30px 0',
                            }}
                        >
                            <Button variant="containedRed" onClick={toggleShowTextArea}>
                                거절
                            </Button>
                            <Button variant="containedGrey">승인</Button>
                        </Stack>
                    ))}
            </Stack>
        </Stack>
    );
};

export default RequestDetailsLayout;
