import { Button, ButtonTheme } from "./Button";
import { render, screen } from "@testing-library/react";


describe('Button tests', () => {
    test('button will be render in the document', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button>TEXT</Button>)
        expect(screen.getByText('TEXT')).toBeInTheDocument()
    })
    test('button will be render with clear theme', () => {
        // eslint-disable-next-line i18next/no-literal-string
        render(<Button theme={ButtonTheme.CLEAR}>TEXT</Button>)
        expect(screen.getByText('TEXT')).toHaveClass('clear')
        screen.debug()
    })
})
