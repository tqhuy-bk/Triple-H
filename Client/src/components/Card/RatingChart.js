import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { Star } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import { cardStyles } from '../../style';
import { getStar } from '../../utils/utils';

export default function RatingChart(props) {
  const { star } = props;
  const [totalRate, setTotalRate] = useState(0);
  useEffect(() => {
    if (star) {
      let tmp = star.reduce((a, b) => a + b, 0);
      setTotalRate(tmp);
    }
  }, [star]);

  const classes = cardStyles();

  return (
    <Card className={classes.starContainer}>
      <div className={classes.header}>
        <Typography variant="h5">Đánh giá</Typography>
      </div>
      <CardContent className={classes.starContent}>
        <div className={classes.totalRating}>
          <div className={classes.center}>
            <Typography variant="h2" className={classes.textStar}>
              <Star className={classes.iconStar} />
              {getStar(star)} /5
            </Typography>
          </div>
          <Typography variant="h6" className={classes.center}>
            {totalRate} lượt đánh giá
          </Typography>
        </div>
        <div className={classes.chart}>
          {star?.map((item, index) => (
            <Box key={index}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Box className={classes.rateLabel}>
                  <Typography>{index + 1}</Typography>
                </Box>
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    value={totalRate !== 0 ? (item * 100) / totalRate : 0}
                    className={classes.line}
                  />
                </Box>
              </div>
            </Box>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
