import { Controller, useFormContext } from 'react-hook-form';

import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';

const RequestListFilter = () => {
    const { control } = useFormContext();

    return (
        <Stack sx={{ gap: '16px' }}>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    요청 분류
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <Controller
                        name="serviceTypes.PURCHASE"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                sx={{ fontSize: '14px' }}
                                label={<Typography fontSize={14}>수매 승인 요청</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="serviceTypes.VILLAGE_HEAD"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>면장 등록 요청</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="serviceTypes.FARMER"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>농부 등록 요청</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="serviceTypes.TREES_TRANSACTION"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>나무 수령 승인 요청</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="serviceTypes.SECTION"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>지역 생성 요청</Typography>}
                            />
                        )}
                    />
                </FormGroup>
            </Stack>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    요청 상태
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <Controller
                        name="statuses.PENDING"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                sx={{ fontSize: '14px' }}
                                label={<Typography fontSize={14}>대기</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="statuses.APPROVED"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>승인</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="statuses.REJECTED"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>거절</Typography>}
                            />
                        )}
                    />
                </FormGroup>
            </Stack>
        </Stack>
    );
};

export default RequestListFilter;
