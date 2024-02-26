"use client"
import { useState } from "react";
import { UranaiContainer } from "./style";
import fool from '../../../assets/img/0.png';
import magican from '../../../assets/img/1.png';
import hio from '../../../assets/img/2.png';
import empress from '../../../assets/img/3.png';
import emperor from '../../../assets/img/4.png';
import herophant from '../../../assets/img/5.png';
import chariot from '../../../assets/img/6.png';
import lover from '../../../assets/img/7.png';
import strength from '../../../assets/img/8.png';
import hermit from '../../../assets/img/9.png';
import wheel from '../../../assets/img/10.png';
import justice from '../../../assets/img/11.png';
import hanged from '../../../assets/img/12.png';
import death from '../../../assets/img/13.png';
import temperance from '../../../assets/img/14.png';
import devil from '../../../assets/img/15.png';
import tower from '../../../assets/img/16.png';
import star from '../../../assets/img/17.png';
import moon from '../../../assets/img/18.png';
import sun from '../../../assets/img/19.png';
import judgment from '../../../assets/img/20.png';
import world from '../../../assets/img/21.png';
import aceCup from '../../../assets/img/22.png';
import acePen from '../../../assets/img/23.png';
import aceSword from '../../../assets/img/24.png';
import aceWand from '../../../assets/img/25.png';
import eightCup from '../../../assets/img/26.png';
import eightPen from '../../../assets/img/27.png';
import eightSword from '../../../assets/img/28.png';
import eightWand from '../../../assets/img/29.png';
import fiveCup from '../../../assets/img/30.png';
import fivePen from '../../../assets/img/31.png';
import fiveSword from '../../../assets/img/32.png';
import fiveWand from '../../../assets/img/33.png';
import fourCup from '../../../assets/img/34.png';
import fourPen from '../../../assets/img/35.png';
import fourSword from '../../../assets/img/36.png';
import fourWand from '../../../assets/img/37.png';
import kingCup from '../../../assets/img/38.png';
import kingPen from '../../../assets/img/39.png';
import kingSword from '../../../assets/img/40.png';
import kingWand from '../../../assets/img/41.png';
import knightCup from '../../../assets/img/42.png';
import knightPen from '../../../assets/img/43.png';
import knightSword from '../../../assets/img/44.png';
import knightWand from '../../../assets/img/45.png';
import nineCup from '../../../assets/img/46.png';
import ninePen from '../../../assets/img/47.png';
import nineSword from '../../../assets/img/48.png';
import nineWand from '../../../assets/img/49.png';
import pageCup from '../../../assets/img/50.png';
import pagePen from '../../../assets/img/51.png';
import pageSword from '../../../assets/img/52.png';
import pageWand from '../../../assets/img/53.png';
import queenCup from '../../../assets/img/54.png';
import queenPen from '../../../assets/img/55.png';
import queenSword from '../../../assets/img/56.png';
import queenWand from '../../../assets/img/57.png';
import sevenCup from '../../../assets/img/58.png';
import sevenPen from '../../../assets/img/59.png';
import sevenSword from '../../../assets/img/60.png';
import sevenWand from '../../../assets/img/61.png';
import sixCup from '../../../assets/img/62.png';
import sixPen from '../../../assets/img/63.png';
import sixSword from '../../../assets/img/64.png';
import sixWand from '../../../assets/img/65.png';
import tenCup from '../../../assets/img/66.png';
import tenPen from '../../../assets/img/67.png';
import tenSword from '../../../assets/img/68.png';
import tenWand from '../../../assets/img/69.png';
import threeCup from '../../../assets/img/70.png';
import threePen from '../../../assets/img/71.png';
import threeSword from '../../../assets/img/72.png';
import threeWand from '../../../assets/img/73.png';
import twoCup from '../../../assets/img/74.png';
import twoPen from '../../../assets/img/75.png';
import twoSword from '../../../assets/img/76.png';
import twoWand from '../../../assets/img/77.png';
import type { StaticImageData } from "next/image";
import { Button } from "@mui/material";


function Uranai() {
    let card: StaticImageData[] = [
        magican, fool, hio, empress, emperor, herophant, chariot,
        lover, strength, hermit, wheel, justice, hanged, death, temperance,
        devil, tower, star, moon, sun, judgment, world, aceCup, acePen, aceSword,
        aceWand, eightCup, eightPen, eightSword, eightWand, fiveCup, fivePen, fiveSword, fiveWand,
        fourCup, fourPen, fourWand, fourSword, kingCup, kingPen, kingSword, kingWand, knightCup,
        knightPen, knightSword, knightWand, nineCup, ninePen, nineSword, nineWand, pageCup, pagePen, pageWand,
        pageSword, queenCup, queenPen, queenSword, queenWand, sevenCup, sevenPen, sevenSword, sevenWand,
        sixCup, sixPen, sixSword, sixWand, tenCup, tenPen, tenSword, tenWand, threeCup, threePen, threeSword, threeWand,
        twoCup, twoPen, twoSword, twoWand
    ]

    const [image, setImage] = useState<StaticImageData[]>([])
    const handleShuffle = () => {
        const shuffleImages = card.sort(() => Math.random() - 0.5).slice(0, 9);
        setImage(shuffleImages)

    }
    return (
        <UranaiContainer>
            <div className="body">
                <h1>What will your future be?</h1>
                <div className='image'>
                    {image.map((image, index) => (
                        <img key={index} src={image.src} alt={`Random ${index + 1}`} />
                    ))}
                    <div className="click">
                        <Button variant="contained" onClick={handleShuffle}>Good luck!</Button>
                    </div>
                </div>

            </div>
        </UranaiContainer>
    )
}

export default Uranai