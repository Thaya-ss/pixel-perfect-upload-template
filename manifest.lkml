project_name: "excel-template-upload"

application: excel-template-upload {
  label: "Pixel Perfect"
  url: "https://localhost:8080/bundle.js"
  # file: "bundle.js
  entitlements: {
    external_api_urls: ["https://pixelperfect.squareshift.dev","https://jsonplaceholder.typicode.com/posts"]
    core_api_methods: ["me"]
    use_iframes: yes
  }
}
