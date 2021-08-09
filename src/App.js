import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
	root: {
		paddingTop: "7%",
	},
	title: {
		textAlign: "center",
		fontWeight: 600,
	},
});

const App = () => {
	const classes = useStyles();
	const [second, setSecond] = useState(55);
	const [minute, setMinute] = useState(0);
	const [hour, setHour] = useState(0);
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	const upMinute = () => {
		if (minute === 59) {
			setMinute(0);
			setHour(hour + 1);
		} else setMinute(minute + 1);
	};

	const upSecond = () => {
		if (second === 59) {
			setSecond(0);
			upMinute();
		} else setSecond(second + 1);
	};

	useEffect(() => {
		sleep(1000).then(() => {
			upSecond();
		});
	});

	return (
		<div className={classes.root}>
			<Typography className={classes.title} variant="h2">
				메이플 알람
			</Typography>
			<Typography className={classes.title} variant="h3">
				{hour} : {minute} : {second}
			</Typography>
		</div>
	);
};

export default App;
