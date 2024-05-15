# HTML Template Builder &emsp; [![latest version badge]][npm] [![license badge]][license] [![downloads badge]][npm]

[latest version badge]: https://img.shields.io/npm/v/htb
[license badge]: https://img.shields.io/npm/l/htb
[downloads badge]: https://img.shields.io/npm/dw/htb
[npm]: https://www.npmjs.com/package/htb
[license]: https://github.com/noway/htb/blob/main/LICENSE

HTML Template Builder (Htb.js) is a 50-line HTML template engine that uses JavaScript syntax.

Htb.js was not invented. Htb.js was discovered at the intersection of HTML and JavaScript. Htb.js takes inspiration from Ruby's Jbuilder and JavaScript's json2html, and can be seen as a synthesis of the two, or a 'what if Jbuilder and json2html were combined'.

## Examples

### Getting started

```typescript
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
console.log(htb.html)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      p {
        font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Hello, John Doe!</h1>
    <p><b>This is bold text.</b><i>This is italic text.</i><u>This is underlined text.</u></p>
  </body>
</html>
```

### Conditionals & variables

```typescript
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
console.log(htb.html)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Conditionals Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      p {
          font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>User Profile</h1>
    <p>Welcome, Member John Doe!</p>
  </body>
</html>
```

### Nested Loops

```typescript
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
console.log(htb.html)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Nested Loops Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      p {
          font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Categories and Items</h1>
    <h2>Fruits</h2>
    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
    <h2>Vegetables</h2>
    <ul>
      <li>Carrot</li>
      <li>Broccoli</li>
      <li>Spinach</li>
    </ul>
  </body>
</html>
```

### Partial Templates

```typescript
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
console.log(htb.html)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Partial Templates Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      p {
          font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <header>
      <h1>My Website</h1>
      <nav><a href="/">Home</a><a href="/about">About</a><a href="/contact">Contact</a></nav>
    </header>
    <main>
      <h2>Page Content</h2>
      <p>Welcome to the page!</p>
    </main>
    <footer>
      <p>Made with &lt;3 and coffee.</p>
    </footer>
  </body>
</html>
```

### Numbers

```typescript
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
console.log(htb.html)
```
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Arithmetic Operations Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      p {
          font-family: Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1>Basic Arithmetic</h1>
    <p>Sum of <span>10</span> and <span>5</span>: <span>15</span></p>
    <p>Product of <span>7</span> and <span>3</span>: <span>21</span></p>
    <p>Division of <span>20</span> by <span>4</span>: <span>5</span></p>
  </body>
</html>
```

## FAQ

### 1. Is this JSX?

JSX is a syntactic extension of JavaScript. Htb.js is closer to `React.createElement()`, although without the React part.

### 2. Is JSX to Htb.js compiler planned?

No.

### 3. Should I use this in production?

Fortune favours the brave.

### 4. How to use this in my project?

It's best to copy paste the [`htb.ts`](https://github.com/noway/htb/blob/main/htb.ts) file into your repo. Although an [NPM package](https://www.npmjs.com/package/htb) is also available.

### 5. Is there a way to generate Htb.js code from HTML?

Use this LLM prompt: [`llm-prompt.txt`](https://github.com/noway/htb/raw/main/llm-prompt.txt)
