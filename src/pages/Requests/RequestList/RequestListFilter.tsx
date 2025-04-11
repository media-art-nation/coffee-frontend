import { useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';

const RequestListFilter = () => {
    const { register } = useFormContext();

    return (
        <Stack sx={{ gap: '16px' }}>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    요청 분류
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <FormControlLabel
                        control={<Checkbox {...register('serviceTypes.PURCHASE')} />}
                        sx={{ fontSize: '14px' }}
                        label={<Typography fontSize={14}>수매 승인 요청</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('serviceTypes.VILLAGE_HEAD')} />}
                        label={<Typography fontSize={14}>면장 등록 요청</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('serviceTypes.FARMER')} />}
                        label={<Typography fontSize={14}>농부 등록 요청</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('serviceTypes.TREES_TRANSACTION')} />}
                        label={<Typography fontSize={14}>나무 수령 승인 요청</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('serviceTypes.SECTION')} />}
                        label={<Typography fontSize={14}>지역 생성 요청</Typography>}
                    />
                </FormGroup>
            </Stack>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    요청 상태
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <FormControlLabel
                        control={<Checkbox {...register('statuses.PENDING')} />}
                        sx={{ fontSize: '14px' }}
                        label={<Typography fontSize={14}>대기</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('statuses.APPROVED')} />}
                        label={<Typography fontSize={14}>승인</Typography>}
                    />
                    <FormControlLabel
                        control={<Checkbox {...register('statuses.REJECTED')} />}
                        label={<Typography fontSize={14}>거절</Typography>}
                    />
                </FormGroup>
            </Stack>
        </Stack>
    );
};

export default RequestListFilter;
