```css
.italic {
  font-synthesis: none;
  font-style: italic;
}

@supports (font-variation-settings: normal) {
  .italic {
    font-variation-settings: "ital" 1;
  }
}
```
