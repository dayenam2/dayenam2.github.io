#!/bin/bash

max=71
for (( i=0; i <= $max; ++i ))
do
	let mins=i*2/60
	let secs=i*2%60
	contents=$(printf "ffmpeg -i OPENER.mp4 -ss 00:%02d:%02d -t 00:00:03 OPENER%02d.mp4" $mins $secs $i)
	eval $contents
done