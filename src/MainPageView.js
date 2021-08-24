import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import useSound from "use-sound";

const useStyles = makeStyles({
	root: {
		paddingTop: "7%",
	},
	title: {
		textAlign: "center",
		fontWeight: 600,
	},
});

const MainPageView = () => {
	const classes = useStyles();
	const [second, setSecond] = useState(0);
	const [minute, setMinute] = useState(0);
	const [hour, setHour] = useState(0);
	const [allSecond, setAllSecond] = useState(second);
	const [allMinute, setAllMinute] = useState(minute);
	const [allHour, setAllHour] = useState(hour);
	const sleep = (milliseconds) => {
		return new Promise((resolve) => setTimeout(resolve, milliseconds));
	};

	// 초 증가
	const upSecond = () => {
		if (second === 59) {
			setSecond(0);
			upMinute();
		} else setSecond(second + 1);
		upAllSecond();
	};

	// 분 증가
	const upMinute = () => {
		if (minute === 59) {
			setMinute(0);
			setHour(hour + 1);
			upAllHour();
		} else setMinute(minute + 1);
		upAllMinute();
	};

	// 초 합계 증가 (메소회수 계산용)
	const upAllSecond = () => {
		setAllSecond(allSecond + 1);
		if (allSecond > 0 && allSecond % 104 === 0) {
			console.log("all Second : ", allSecond);
			console.log("메소회수타임");
		}
	};

	// 분 합계 증가 (15분 , 30분 계산용)
	const upAllMinute = () => {
		setAllMinute(allMinute + 1);
		if (allMinute > 0 && allMinute % 14 === 0) {
			console.log("all Minute : ", allMinute, minute);
			console.log("15분 경쿠 사용");
		} else if (allMinute > 0 && allMinute % 29 === 0) {
			console.log("all Minute : ", allMinute, minute);
			console.log("30분 버프 사용");
		}
	};

	// 시 합계 증가 ( 2시간 재획비, 경축비 알림)
	const upAllHour = () => {
		setAllHour(allHour + 1);
		if (allHour % 2 === 0) {
			console.log("all Hour : ", allHour);
			console.log("2시간 재획비, 경축비");
		}
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
			<Typography className={classes.title} variant="h3">
				{allSecond}
			</Typography>
		</div>
	);
};

export default MainPageView;
