import React, { useEffect, useRef, useState, useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";

const useStyles = makeStyles({
	root: {
		paddingTop: "7%",
	},
	title: {
		textAlign: "center",
		fontWeight: 600,
	},
	button: {
		backgroundImage: "./image/meso.png",
	},
});

export default function PrePageView() {
	const classes = useStyles();
	const [list, setList] = useState(() => ["30min"]);

	return (
		<div className={classes.root}>
			<Typography className={classes.title} variant="h2">
				메이플 알람
			</Typography>
			<ToggleButtonGroup value={list}>
				<ToggleButton value="meso" className={classes.button}>
					메소 회수
				</ToggleButton>
				<ToggleButton vlaue="15min" className={classes.button}>
					15분 알림
				</ToggleButton>
				<ToggleButton vlaue="30min" className={classes.button}>
					30분 알림
				</ToggleButton>
				<ToggleButton vlaue="2hour" className={classes.button}>
					2시간 알림
				</ToggleButton>
			</ToggleButtonGroup>
		</div>
	);
}
