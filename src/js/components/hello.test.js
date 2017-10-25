import test from 'ava';
import hello from './hello.js';

test('These will pass!', (t) => {
    t.true(hello.iReturnTrue());
    t.true(hello.iReturnTrue());
});

test('These will fail :(', (t) => {
    t.false(hello.iReturnTrue());
    t.false(hello.iReturnTrue());
});