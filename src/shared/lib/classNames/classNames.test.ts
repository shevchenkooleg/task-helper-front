import { classNames } from './classNames';


describe('classNames', () => {
    test('with first one params', () => {
        expect(classNames('someClass')).toBe('someClass');
    });
    test('with additional params', () => {
        const expected = 'someClass class1 class2';
        expect(classNames('someClass', {}, ['class1', 'class2'])).toBe(expected);
    });
    test('with additional params and mods', () => {
        const expected = 'someClass class1 class2 hovered scrollable';
        expect(classNames('someClass', { hovered: true, scrollable: true },
            ['class1', 'class2'])).toBe(expected);
    });
    test('with additional params and mods', () => {
        const expected = 'someClass class1 class2 scrollable';
        expect(classNames('someClass', { hovered: false, scrollable: true },
            ['class1', 'class2'])).toBe(expected);
    });
    test('with additional params and mods', () => {
        const expected = 'someClass class1 class2 hovered';
        expect(classNames('someClass', { hovered: true, scrollable: undefined },
            ['class1', 'class2'])).toBe(expected);
    });
    test('with additional params and mods', () => {
        const expected = 'someClass class1 class3 hovered';
        expect(classNames('someClass', { hovered: true, scrollable: undefined },
            ['class1', 'class2'])).not.toBe(expected);
    });
});

