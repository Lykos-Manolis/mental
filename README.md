# Mental
 A sentiment analysis messaging web-app

# Creating the Model
`!pip install tensorflow==2.15.0`
`!pip install tensorflow_decision_forests==1.8.1`
`!pip install tensorflowjs`

from kaggle we get:
- word_index.json dictionary
- model.json model
- group1-shard1of1.bin weights

---
## Preparing the Data
Machine learning models cant process text. so we prepare the text data for use in neural networks by converting raw text into numerical form (which machine learning models can understand)

To achieve this we use a process called word-to-idex mapping. In our case, we used the `Tokenizer` method from `tensorflow`

```python
from tensorflow.keras.preprocessing.text import Tokenizer

# Preprocess text data
tokenizer = Tokenizer(num_words=10000)
tokenizer.fit_on_texts(df['text'])
sequences = tokenizer.texts_to_sequences(df['text'])
padded_sequences = pad_sequences(sequences, maxlen=100)
```

What this does is it breaks down a string of text into smaller units (called **tokens**). These tokens can be words, subwords, or characters, depending on the level of tokenization.
The **Tokenizer** in Python typically breaks text into words. For example, the sentence "I love machine learning" would be tokenized into the list: `["I", "love", "machine", "learning"]`

After splitting the text into tokens, the Tokenizer assigns each unique token (word) a unique integer index.

```python
{
  "I": 1,
  "love": 2,
  "machine": 3,
  "learning": 4,
  "coding": 5
}
```

The Tokenizer builds a **vocabulary** based on the entire text dataset. It collects all unique words, ranks them by frequency, and assigns an index to each word.

>[!TIP]
>### Why tokenize?
Neural networks and other machine learning algorithms **cannot understand raw text**. They require numerical input, which is why we need to convert words into numbers. The Tokenizer provides an easy and efficient way to do this.

>[!TIP]
>### Why limit to 10k words
>- **Text data can have an extremely large vocabulary**: In any large corpus, there can be millions of unique words (including variations, rare words, typos, etc.). If you were to use all of these words, the size of your vocabulary would grow substantially, which would make the model harder to train (more parameters, larger embeddings, etc.).
>- By setting `num_words=10000`, you limit the vocabulary to the **most common 10,000 words**. This reduces the complexity and ensures that the model focuses on the words that are most relevant or frequent in the dataset.
>- Including too many rare words can lead to overfitting, especially if the model memorizes them. By limiting the vocabulary to the most frequent words, you help ensure that the model generalizes better.

## Training the Model

## Analyzing Performance

## Exporting the Model

# Creating the Web-App
>[!NOTE]
>As of now, all backend will be handled in supabase

>[!IMPORTANT]
>### Glossary
>- Wrapper
>- Routing
>- Element
>- View
>- React
>- Component
>- Props
>- Tag
>- Single Page Application (SPA)

>[!TIP]
>### Bibliography
>[Vite](https://www.reddit.com/r/reactjs/comments/yuxa16/createreactapp_or_vite_for_new_project/?rdt=40058)
>  It's faster and does not need ejecting
>  
>[SWC](https://www.dhiwise.com/post/maximize-performance-how-swc-enhances-vite-and-react)
>  
>[MUI](https://mui.com/material-ui/all-components/)
>  Responsive layout both for desktop and mobile applications
>  
>[React Router Dom](https://v5.reactrouter.com/web/guides/quick-start)
>  For routing between views

## Routing
A well known React library is integrated to handle "page" routing, called `react-router-dom`.
This library helps define components as "pages" that the app can route to.

### 1. Wrapper
To link everything together, the app is being wrapped with the `BrowserRouter` element:

`App.jsx`
```jsx
<BrowserRouter>
	<ThemeProvider theme={darkTheme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
		</Routes>
	</ThemeProvider>
</BrowserRouter>
```
This wrapper informs the app of the routing and helps nest all the possible routes that are available to link to.

### 2. Routes
Inside that wrapper, a series of *routes* are being nested, representing the different "pages" a user can be linked to throughout the application.

`App.jsx`
```jsx
<Routes>
	<Route path="/" element={<Homepage />} />
	<Route path="/chat/:chatId" element={<Chat />} />
	<Route path="*" element={<NotFound />} />
</Routes>
```
Among these routes we can distill four main path types:
1. A path with a single slash `"/"` declaring the main view of the application.
2. Paths with a slash and a name `"/about"` declaring a view.
3. Paths like a view, with a colon `"/chat/:chatId"` declaring a sub-view.
4. A path with an asterisk `"*"` declaring every path that is not declared (typically for not-found views) 

### 3. Links
Each element is being defined as a link component and includes the link of the view it will route to when clicked.

`Sample routing button`
```jsx
<Button
	component={Link}
	to="/home"
/>
```
The "component" prop will render the component as a `Link` and the "to" prop will define where it will link to when clicked.

---
## Styling
For styling, a popular component library is used called Material UI or [MUI](https://mui.com/material-ui/)

### 1. About MUI
Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box.

The main advantage of using Material UI is a faster developing time and keeping the focus on business logic instead of styling and formatting. The library also includes an extensive set of intuitive customizability features as well as templates to speed up the development even more, however for this project no template will be used.

### 2. Component Usage
Material UI provides a plethora of pre-built components for use. Once Installed, a component can easily be used by importing it and inserting a simple tag.

Imported components can be as simple or a complex as the user needs. MUI provides the ability to customize them by adding several different props that alter them in many ways depending on the component. A list of such components can be found [here](https://mui.com/material-ui/all-components/)

`MUI button usage`
```jsx
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  );
}
```

`Button output`
![[{3E757C6E-36BF-482E-89F8-CB4E0A6501BC}.png]]

### 3. Custom Styles
With MUI, custom styles can be defined by passing the `sx` prop to a component. The `sx` allows working with a superset of CSS that packages all of the style functions exposed in `@mui/system`. 

Any valid CSS can be specified using this prop, as well as many _theme-aware_ properties that are unique to MUI System.

`Utilizing the sx prop`
```jsx
<Box
    sx={{
	    bgcolor: 'background.paper',
	    boxShadow: 1,
	    borderRadius: 2,
	    p: 2,
	    minWidth: 300,
    }}
/>
```

### 4. Themes and Color Palettes
With MUI, creating a theme like a dark-mode is as easy as wrapping the application and defining the color palette.

To maintain the dark aspect of the application, a dark theme is stored using MUI's `createTheme()` function.

`Defining the theme`
```jsx
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

After that, the `App.jsx` is wrapped with Material UI's `ThemeProvider` tag, with the pre-defined theme passed as a prop.

`Using the theme`
```jsx
export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}
```

With this method we can ensure that the application uses the default color palette for dark mode.
![[{73753C33-D045-4675-BD4C-136AD510663F}.png]]

### 5. Layout and Responsiveness
To keep the application responsive across different screens and devices, several MUI components are utilized such as `Container` and `Stack` that help set a base layout of the encapsulated components, as well as several `breakpoints` that define aspects based on the screen size.

Using a `Stack` tag can be an easy way to layout components and arrange them horizontally or vertically.

`Arranging items with a Stack`
```jsx
<Stack
  spacing={{ xs: 1, sm: 2 }}
  direction="row"
  useFlexGap
  sx={{ flexWrap: 'wrap' }}
>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Long content</Item>
</Stack>
```

`Stack output`
![[{C089DE2B-36F1-4425-A40C-B516F83CFCA6}.png]]

Breakpoints help define the different changes based on the current screen size. To make use of them, a pre-defined breakpoint can be used in the `sx` prop of the component. 

`Utilizing the breakpoints`
```jsx
<Box
  sx={{
    width: {
      xs: 100, // theme.breakpoints.up('xs')
      sm: 200, // theme.breakpoints.up('sm')
      md: 300, // theme.breakpoints.up('md')
      lg: 400, // theme.breakpoints.up('lg')
      xl: 500, // theme.breakpoints.up('xl')
    },
  }}
>
  This box has a responsive width.
</Box>
```

This way we can make sure that every component has the correct layout for each screen and every bit is visible both in mobile and desktop screens.

>[!NOTE]
>### Difference between breakpoints
>MUI's pre-defined breakpoints include:
>`xs`: screen width of `0px` - `599px`
>`sm`: screen width of `600px` - `899px`
>`md`: screen width of `900px` - `1199px`
>`lg`: screen width of `1200px` - `1535px`
>`xl`: screen width of `1536px`+


## Database

## API

## Hooks

## Host

## Authentication

# Migrating to Mobile
The app can migrate to mobile by making it into a progressive web-app (PWA). To do that, a developer tool is used when navigating through chrome's developer tools while on the website and selecting Lighthouse.

### Lighthouse Tool
The lighthouse tool on google chrome's developer tools allows us to analyze the performance of the application. After auditing the site, it can determine the performance, accessibility, best practices and search engine optimization (SEO). 
![[{7C2EB199-FBEC-417B-8165-9C2D153C1072}.png]]

It can also provide additional information for each of them and major flaws to fix later on.![[Pasted image 20250211143254.png]]

When the metrics reach a certain point meaning it *could* be made into a PWA, the lighthouse lets us transform it and even upload it to Play Store.

### Migration Process
To migrate we need to create a JavaScript worker*
In our case, a popular library will be used to handle all that, called ??

![](https://youtu.be/sFsRylCQblw?si=eP5Vk9_5j-xLOvbq)
