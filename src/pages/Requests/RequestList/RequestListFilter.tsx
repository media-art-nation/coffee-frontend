import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';

import { getCookies } from '@/apis/AppUser/cookie';

const RequestListFilter = () => {
    const { t } = useTranslation();
    const { control } = useFormContext();
    const role = getCookies('role');

    return (
        <Stack sx={{ gap: '16px' }}>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    {t('요청 분류')}
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <Controller
                        name="serviceTypes.VILLAGE_HEAD"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>{t('면장 관리')}</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="serviceTypes.FARMER"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>{t('농부 관리')}</Typography>}
                            />
                        )}
                    />
                    {
                        // 부관리자 - 농림부의 경우 수매 관리에 대한 요청 확인 불가능
                        role !== 'VICE_ADMIN_AGRICULTURE_MINISTRY_OFFICER' && (
                            <Controller
                                name="serviceTypes.PURCHASE"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={<Checkbox {...field} checked={field.value} />}
                                        sx={{ fontSize: '14px' }}
                                        label={
                                            <Typography fontSize={14}>{t('수매 관리')}</Typography>
                                        }
                                    />
                                )}
                            />
                        )
                    }
                    <Controller
                        name="serviceTypes.SECTION"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>{t('지역 관리')}</Typography>}
                            />
                        )}
                    />
                </FormGroup>
            </Stack>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                <Typography variant="body1/semibold" sx={{ flexShrink: '0' }}>
                    {t('요청 상태')}
                </Typography>
                <FormGroup sx={{ flexDirection: 'row', gap: '8px' }}>
                    <Controller
                        name="statuses.PENDING"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                sx={{ fontSize: '14px' }}
                                label={<Typography fontSize={14}>{t('대기')}</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="statuses.APPROVED"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>{t('승인')}</Typography>}
                            />
                        )}
                    />
                    <Controller
                        name="statuses.REJECTED"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label={<Typography fontSize={14}>{t('거절')}</Typography>}
                            />
                        )}
                    />
                </FormGroup>
            </Stack>
        </Stack>
    );
};

export default RequestListFilter;
