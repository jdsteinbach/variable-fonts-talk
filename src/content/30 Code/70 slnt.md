```css
.text--slanted {
  font-style: italic;
}

@supports (font-variation-settings: normal) {
  .text--slanted {
    font-variation-settings: "slnt" 10;
    font-style: oblique 10deg;
  }
}
```
