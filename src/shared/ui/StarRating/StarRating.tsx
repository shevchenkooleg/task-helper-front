import cls from "./StarRating.module.scss"
import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useState } from "react";
import { Icon } from "../Icon/Icon";
import StarIcon from '../../assets/icons/Star-icon.svg'

interface StarRatingProps {
    className?: string
    onSelect?: (startsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, selectedStars = 0, size = 30 } = props
    const [currentStartCount, setCurrentStartCount] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStartCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStartCount(0)
        }
    }

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map(starNumber => (
                <Icon
                    key={starNumber}
                    Svg={StarIcon}
                    width={size}
                    height={size}
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentStartCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    onClick={onClick(starNumber)}
                    data-testid={`StarRating.${starNumber}`}
                    data-selected={currentStartCount >= starNumber}
                />
            ))}
        </div>
    );
});

StarRating.displayName = 'StarRating'
