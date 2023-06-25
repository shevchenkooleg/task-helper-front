import cls from "./Avatar.module.scss"
import { classNames, type Mods } from "@/shared/lib/classNames/classNames";
import { type CSSProperties, useMemo } from "react";
import { AppImage } from "../AppImage";
import UserIcon from '../../assets/icons/AvatarFallback-icon.svg'
import { Skeleton } from "../Skeleton";
import { Icon } from "../Icon";

interface AvatarProps {
    className?: string
    avatar?: string
    size?: number
    alt?: string
    round?: number
    fallbackInverted?: boolean
}

export const Avatar = (props: AvatarProps) => {
    const { className, avatar, size = 100, round = 50, alt, fallbackInverted } = props
    const mods: Mods = {}
    const styles = useMemo<CSSProperties>(() => {
        return {
            width: size,
            height: size,
            borderRadius: `${String(round)}%`
        }
    }, [round, size])

    const fallback = <Skeleton width={size} height={size} border={'50%'}/>
    const errorFallback = <Icon inverted={fallbackInverted} width={size} height={size} Svg={UserIcon}/>

    return (
        <AppImage
            className={classNames(cls.Avatar, mods, [className])}
            alt={alt}
            style = {styles}
            src={avatar}
            errorFallback={errorFallback}
            fallback={fallback}
        />
    );
};
