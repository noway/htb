import { test } from 'node:test'
import assert from 'node:assert'
import { Htb } from './htb';

const simple_tape = '<!DOCTYPE html><html><head><title>Simple Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><h1>Hello, John Doe!</h1><p><b>This is bold text. </b><i>This is italic text. </i><u>This is underlined text.</u></p></body></html>'
const variables_tape = '<!DOCTYPE html><html><head><title>Variables Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><h1>Welcome, John Doe!</h1><p>Your email is johndoe@example.com.</p></body></html>'
const conditionals_tape = '<!DOCTYPE html><html><head><title>Conditionals Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><h1>User Profile</h1><p>Welcome, Member John Doe!</p></body></html>'
const nested_loops_tape = '<!DOCTYPE html><html><head><title>Nested Loops Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><h1>Categories and Items</h1><h2>Fruits</h2><ul><li>Apple</li><li>Banana</li><li>Orange</li></ul><h2>Vegetables</h2><ul><li>Carrot</li><li>Broccoli</li><li>Spinach</li></ul></body></html>'
const partial_templates_tape = '<!DOCTYPE html><html><head><title>Partial Templates Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><header><h1>My Website</h1><nav><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav></header><main><h2>Page Content</h2><p>Welcome to the page!</p></main><footer><p>Made with &lt;3 and coffee.</p></footer></body></html>'
const arithmetic_operations_tape = '<!DOCTYPE html><html><head><title>Arithmetic Operations Example</title><meta name="viewport" content="width=device-width, initial-scale=1"><style type="text/css">p { font-family: Arial, Helvetica, sans-serif; }</style></head><body><h1>Basic Arithmetic</h1><p>Sum of <span>10</span> and <span>5</span>: <span>15</span></p><p>Product of <span>7</span> and <span>3</span>: <span>21</span></p><p>Division of <span>20</span> by <span>4</span>: <span>5</span></p></body></html>'

test('simple template', () => {
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Simple Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => [
        Htb('h1', {}, () =>
          'Hello, John Doe!'
        ),
        Htb('p', {}, () => [
          Htb('b', {}, 'This is bold text. '),
          Htb('i', {}, 'This is italic text. '),
          Htb('u', {}, 'This is underlined text.')
        ])
      ])
    ]);
  assert.equal(htb.html, simple_tape)
})

test('variables template', () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
  };
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Variables Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => [
        Htb('h1', {}, () => [
          `Welcome, ${user.name}!`
        ]),
        Htb('p', {}, () => [
          `Your email is ${user.email}.`
        ])
      ])
    ]);
  assert.equal(htb.html, variables_tape)
})

test('conditionals template', () => {
  const user = {
    isAdmin: false,
    isMember: true,
    name: 'John Doe'
  };
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Conditionals Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => [
        Htb('h1', {}, 'User Profile'),
        user.isAdmin
          ? Htb('p', {}, `Welcome, Admin ${user.name}!`)
          : user.isMember
            ? Htb('p', {}, `Welcome, Member ${user.name}!`)
            : Htb('p', {}, 'Welcome, Guest!')
      ])
    ]);
  assert.equal(htb.html, conditionals_tape)
})

test('nested loops template', () => {
  const categories = [
    { name: 'Fruits', items: ['Apple', 'Banana', 'Orange'] },
    { name: 'Vegetables', items: ['Carrot', 'Broccoli', 'Spinach'] }
  ];
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Nested Loops Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => {
        const elements = [Htb('h1', {}, 'Categories and Items')];
        for (const category of categories) {
          elements.push(Htb('h2', {}, category.name)
            ('ul', {}, () =>
              category.items.map(item =>
                Htb('li', {}, item)
              )
            ));
        }
        return elements;
      })
    ]);
  assert.equal(htb.html, nested_loops_tape)
})

test('partial templates template', () => {
  const headerTemplate = Htb
    ('header', {}, () => [
      Htb('h1', {}, 'My Website'),
      Htb('nav', {}, () => [
        Htb('a', { href: '/' }, 'Home'),
        Htb('a', { href: '/about' }, 'About'),
        Htb('a', { href: '/contact' }, 'Contact')
      ])
    ]);
  const footerTemplate = Htb
    ('footer', {}, () => [
      Htb('p', {}, 'Made with <3 and coffee.')
    ]);
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Partial Templates Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => [
        headerTemplate,
        Htb('main', {}, () => [
          Htb('h2', {}, 'Page Content'),
          Htb('p', {}, 'Welcome to the page!')
        ]),
        footerTemplate
      ])
    ]);
  assert.equal(htb.html, partial_templates_tape)
})

test('arithmetic operations template', () => {
  const htb = Htb
    ('!DOCTYPE', { html: true })
    ('html', {}, () => [
      Htb('head', {}, () => [
        Htb('title', {}, 'Arithmetic Operations Example'),
        Htb('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        Htb('style', { type: 'text/css' }, 'p { font-family: Arial, Helvetica, sans-serif; }')
      ]),
      Htb('body', {}, () => [
        Htb('h1', {}, 'Basic Arithmetic'),
        Htb('p', {}, [
          'Sum of ', Htb('span', {}, '10'), ' and ', Htb('span', {}, '5'), ': ',
          Htb('span', {}, `${10 + 5}`) // a number
        ]),
        Htb('p', {}, [
          'Product of ', Htb('span', {}, '7'), ' and ', Htb('span', {}, '3'), ': ',
          Htb('span', {}, `${7 * 3}`) // a number
        ]),
        Htb('p', {}, [
          'Division of ', Htb('span', {}, '20'), ' by ', Htb('span', {}, '4'), ': ',
          Htb('span', {}, `${20 / 4}`) // a number
        ])
      ])
    ]);
  assert.equal(htb.html, arithmetic_operations_tape)
})

