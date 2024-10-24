project_name: "operative_pixel"

# # Use local_dependency: To enable referencing of another project
# # on this instance with include: statements
#
# local_dependency: {
#   project: "name_of_other_project"
# }

application: operative_pixel {
  label: "Operative Pixel Perfect"
  url: "https://localhost:8080/bundle.js"
  # file: "bundle.js
  entitlements: {
    external_api_urls: ["https://pixelperfect.squareshift.dev"]
    core_api_methods: ["me"]
    use_iframes: yes
  }
}
