import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//これが中身
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function MyPage03() {
    const location = useLocation();
    console.log(location);

    const navigate = useNavigate();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <h2>これは MyPage03 です</h2>
                <button onClick={() => console.log('onClick start...')}> Click Me!</button>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Chart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                    }}
                >
                    <Deposits />
                </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Orders />
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MyPage03;
