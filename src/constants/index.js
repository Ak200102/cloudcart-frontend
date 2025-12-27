import bannerImgOne from "../assets/Images/banner/bannerImgOne.jpg";
import bannerImgTwo from "../assets/Images/banner/bannerImgTwo.jpg";
import bannerImgThree from "../assets/Images/banner/bannerImgThree.jpg";
import { TbTruckDelivery } from "react-icons/tb";
import { MdCurrencyRupee } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";



export const headerNavigation = [
    {
        title:"Home",
        link:"/",
    },
    {
        title:"Shop",
        link:"/shop",
    },
    {
        title:"About",
        link:"/about",
    },
    {
        title:"Contact",
        link:"/contact",
    },
    {
        title:"Orders",
        link:"/orders",
    },
];
export const bannerData = [
    {
        title:"Top selling SmartPhone and accessories",
        discount:"discount up to 40%",
        from:599.99 ,
        sale:"Flash Sale",
        image:bannerImgOne
    },
    {
        title:"The best deals on MacBooks",
        discount:"about $250 off",
        from:2349.99 ,
        sale:"Flash Sale",
        image:bannerImgTwo
    },
    {
        title:"Discount 50% on all headphones",
        discount:"Free shipping over $100",
        from:499.99 ,
        sale:"Flash Sale",
        image:bannerImgThree
    },
]