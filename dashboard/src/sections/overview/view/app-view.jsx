import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Estufatec 🍃🍂🌿
      </Typography>

      <Grid container spacing={3} display="flex" justifyContent="center" alignItems="center">
        <Stack spacing={2} xs={12} md={12} lg={2}>

              <AppWidgetSummary
                title="Humidade Atual"
                total={82}
                color="success"
                percent={1}
                icon={<img alt="icon" src="/assets/water.png" />}
              />



              <AppWidgetSummary
                title="Temperatura Atual"
                total={32}
                color="info"
                icon={<img alt="icon" src="/assets/termometer.png" />}
              />

      </Stack>

        <Grid xs={12} md={12} lg={8}>
          <AppWebsiteVisits
            title=""
            subheader=""
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Umidade',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Temperatura',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
