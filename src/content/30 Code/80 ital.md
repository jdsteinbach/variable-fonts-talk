```css
.text--italic {
  font-style: italic;
}

@supports (font-variation-settings: normal) {
  .text--italic {
    font-variation-settings: "ital" 1;
  }
}
```
