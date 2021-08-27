import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import useSound from "use-sound";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import min15Sound from "./sound/15min.mp3";
import min30Sound from "./sound/30min.mp3";
import hour2Sound from "./sound/2hour.mp3";
import mesoSound from "./sound/meso.mp3";

const useStyles = makeStyles({
	root: {
		paddingTop: "7%",
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	runningBox: {
		marginTop: "5%",
		backgroundColor: "#edf2f2",
		width: "20%",
		borderRadius: "10%",
	},
	text: {
		textAlign: "center",
		fontWeight: 600,
	},
	runningTime: {
		textAlign: "center",
		fontWeight: 600,
		color: "blue",
	},
	form: {
		marginTop: "5%",
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
	const [playMeso] = useSound(mesoSound);
	const [play15min] = useSound(min15Sound);
	const [play30min] = useSound(min30Sound);
	const [play2hour] = useSound(hour2Sound);

	const [checked, setChecked] = React.useState({
		meso: false,
		min15: true,
		min30: true,
		hour2: true,
	});
	const handleChange = (event) => {
		setChecked({ ...checked, [event.target.name]: event.target.checked });
	};

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
		if (checked.meso) {
			if (allSecond > 0 && allSecond % 104 === 0) {
				playMeso();
			}
		}
	};

	// 분 합계 증가 (15분 , 30분 계산용)
	const upAllMinute = () => {
		setAllMinute(allMinute + 1);

		if (allMinute > 0 && allMinute % 14 === 0) {
			if (checked.min15) {
				play15min();
			}
		} else if (allMinute > 0 && allMinute % 29 === 0) {
			if (checked.min30) {
				play30min();
			}
		}
	};

	// 시 합계 증가 ( 2시간 재획비, 경축비 알림)
	const upAllHour = () => {
		setAllHour(allHour + 1);
		if (checked.hour2) {
			if (allHour % 2 === 0) {
				play2hour();
			}
		}
	};

	useEffect(() => {
		sleep(1000).then(() => {
			upSecond();
		});
	});

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<Typography className={classes.text} variant="h2">
					메이플 알람
				</Typography>
			</div>

			<div className={classes.runningBox}>
				<Typography className={classes.text} variant="h1">
					{hour} : {minute} : {second}
				</Typography>
			</div>
			<FormGroup className={classes.form}>
				<FormControlLabel
					control={
						<Switch
							checked={checked.meso}
							onChange={handleChange}
							name="meso"
							color="primary"
						/>
					}
					label="메소 회수 알림"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={checked.min15}
							onChange={handleChange}
							name="min15"
							color="primary"
						/>
					}
					label="15분 알림"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={checked.min30}
							onChange={handleChange}
							name="min30"
							color="primary"
						/>
					}
					label="30분 알림"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={checked.hour2}
							onChange={handleChange}
							name="hour2"
							color="primary"
						/>
					}
					label="2시간 알림"
				/>
			</FormGroup>
		</div>
	);
};

export default MainPageView;
