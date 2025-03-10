import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useStyles } from "./SalePipeLineScreen.styles";

const initialDeals = {
  New: [
    {
      id: "D101",
      title: "Upsell Gói Pro",
      customer: "nguyenvana@example.com",
      usage: "85%",
      survey: "Content",
    },
    {
      id: "D102",
      title: "Mua Plugin Chatbot",
      customer: "hoangtuan@example.com",
      usage: "40%",
      survey: "Chatbot",
    },
  ],
  Contact: [
    {
      id: "D103",
      title: "Gói VIP + Plugin Content",
      customer: "tranthib@example.com",
      usage: "70%",
      survey: "Sẵn sàng chi cao",
    },
  ],
  Negotiation: [],
  "Closed Won": [],
  "Closed Lost": [],
};

const SalePipeLineScreen: React.FC = () => {
  const classes = useStyles();
  const [deals, setDeals] = useState(initialDeals);
  const [draggingDeal, setDraggingDeal] = useState(null);

  const handleDragStart = (e, deal, stage) => {
    e.dataTransfer.setData("deal", JSON.stringify({ deal, stage }));
    setDraggingDeal(deal.id);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, newStage) => {
    e.preventDefault();
    const { deal, stage } = JSON.parse(e.dataTransfer.getData("deal"));
    if (stage !== newStage) {
      const updatedDeals = { ...deals };
      updatedDeals[stage] = updatedDeals[stage].filter(d => d.id !== deal.id);
      updatedDeals[newStage].push(deal);
      setDeals(updatedDeals);
    }
    setDraggingDeal(null);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.title}>Sales Pipeline</Typography>
      </Box>
      <Typography variant="body1" marginBottom={2}>
        Hiển thị các deals theo từng giai đoạn (stage), hỗ trợ kéo-thả để thay
        đổi stage. Click deal để xem chi tiết.
      </Typography>

      <Box className={classes.pipelineBoard}>
        {Object.keys(deals).map(stage => (
          <Box
            key={stage}
            className={classes.pipelineColumn}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, stage)}
          >
            <Typography variant="h6" gutterBottom>
              {stage}
            </Typography>
            {deals[stage].map(deal => (
              <Box
                key={deal.id}
                className={`${classes.dealCard} ${
                  draggingDeal === deal.id ? classes.dragging : ""
                }`}
                draggable
                onDragStart={e => handleDragStart(e, deal, stage)}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {deal.title}
                </Typography>
                <Typography variant="body2">KH: {deal.customer}</Typography>
                <Typography variant="body2">
                  Usage: {deal.usage}, Survey: {deal.survey}
                </Typography>
                <Button className={classes.button} fullWidth>
                  Chi tiết
                </Button>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SalePipeLineScreen;
