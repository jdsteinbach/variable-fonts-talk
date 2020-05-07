```css
.slanted {
  font-synthesis: none;
  font-style: italic;
}

@supports (font-variation-settings: normal) {
  .slanted {
    font-variation-settings: "slnt" 10;
    font-style: oblique 10deg;
  }
}
```
