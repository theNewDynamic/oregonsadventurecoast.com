source: ''
paths:
  data: data
  collections: content
  includes: layouts
  layouts: layouts
  static: static
  uploads: static/img
  source: ''
  archetypes: archetypes
  assets: assets
  content: content
  pages: content
  publish: public
  config: ''
collections_config:
  main_pages:
    path: content
    name: Main Pages
    icon: sim_card
    description: This is where site's main pages go. Sections and homepages.
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/regular-page.md
      home:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        icon: home
        path: .cloudcannon/schemas/home.md
      gallery:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        icon: collections
        path: .cloudcannon/schemas/gallery.md
    _inputs:
      welcomeheadline:
        label: Welcome Headline
        comment: Headline displayed below the slideshow
    filter:
      base: none
      include:
        - _index.md
        - index-es.md
        - adventures.md
        - calendar.md
        - dining.md
        - equipment-rent-and-buy.md
        - events.md
        - gallery.md
        - lodging.md
        - search.md
        - tour-guides-and-charters.md
    output: true
  regular_pages:
    path: content/sitepages
    name: Regular Pages
    icon: tour
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/regular-page.md
    output: true
  adventures:
    path: content/adventure
    name: Adventures
    icon: hiking
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/adventure.md
    output: true
  posts:
    path: content/blog
    name: Blog Post
    icon: article
    sort_options:
      - key: date
        order: desc
        label: Date (Newest First)
      - key: date
        order: asc
        label: Date (Oldest First)
      - key: title
        order: asc
      - key: title
        order: desc
      - label: Drafted
        key: draft
        order: asc
    filter:
      exclude:
        - _index.md
    _inputs:
      date:
        label: Publish Date
        comment: Date this post should be public.
      description:
        comment: Text introducing the post on list pages.
      image:
        comment: Blog photo header - size and scale to 695px by 322px.
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/post.md
    output: true
  events:
    path: content/event
    name: Events
    icon: calendar_month
    subtext_key: startdate
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/event.md
    _inputs:
      desktoptitle:
        label: Desktop Title
        comment: Title displayed on desktop
      mobiletitle:
        label: Mobile Title
        comment: Title displayed on mobile
      hovertitle:
        type: text
        label: Box Animation Title
        comment: Title displayed on Event box animation
      hoverdescription:
        label: Box Animation Description
        comment: Description displays on Event Box animation.
    sort_options:
      - key: startdate
        order: desc
        label: Most Future Start Date
      - key: startdate
        order: asc
        label: Oldest Start Date
      - key: title
        order: asc
    output: true
  trip_ideas:
    path: content/tripideas
    name: Trip Ideas
    icon: tips_and_updates
    parse_branch_index: true
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/trip-idea.md
    _inputs:
      photo:
        label: Header Photo
        comment: Choose a header image - size to 2048px by 530px
      towns:
        type: multiselect
        options:
          values: _select_data.towns
      adventures:
        type: multiselect
        options:
          values: _select_data.adventures
      durations:
        type: multiselect
        options:
          values: _select_data.durations
    output: true
  stores:
    path: content/store
    name: Shopping
    icon: store
    image_key: photo_name
    subtext_key: property_description
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/store.md
    _enabled_editors:
      - data
    filter:
      exclude:
        - _index.md
    output: true
  lodgings:
    path: content/lodgingitems
    name: Lodging
    icon: hotel
    image_key: photo_name
    subtext_key: property_description
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    _enabled_editors:
      - data
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/lodging.md
    _inputs:
      cost:
        type: select
        label: Cost
        options:
          values:
            - 1 - $
            - 2 - $$
            - 3 - $$$
      property_category:
        type: select
        label: Category
        options:
          values:
            - 1 - Hotels, Motels & Inns
            - 2 - RV Parks & Camping
            - 3 - Bed & Breakfasts
            - 4 - Vacation Rental Homes
      amenityList:
        type: multiselect
        label: Amenities
        options:
          values:
            - 1 - Restaurant/Bar/Rm Service
            - 2 - Continental or Full Bkfst
            - 3 - Fitness Center
            - 4 - Pool/Hot Tub
            - 5 - Pet Friendly
            - 6 - WiFi Available
            - 7 - Kitchens Available
            - 8 - Meeting Facilities
            - 9 - Handicap Accessible
            - 10 - Chamber Member
    output: true
  tour_equipments:
    path: content/tourandequipment
    name: Tour & Equipments
    icon: festival
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    _enabled_editors:
      - data
    filter:
      exclude:
        - _index.md
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/tour_equipment.md
    _inputs:
      property_name:
        label: Business Name for Sorting
        comment: This text will determine the alpha sort.
      property_description:
        label: Description
      equip_type:
        type: multiselect
        label: Type
        comment: Please select if this entry provides Tours, Equipment or both.
        options:
          values:
            - Tour
            - Equipment
    output: true
  products:
    path: content/products
    name: Products
    icon: local_offer
    image_key: image
    sort_options:
      - key: title
        order: asc
      - key: title
        order: desc
    schemas:
      default:
        hide_extra_inputs: true
        remove_empty_inputs: true
        remove_extra_inputs: false
        path: .cloudcannon/schemas/product.md
    filter:
      exclude:
        - _index.md
    _enabled_editors:
      - data
    _inputs:
      description:
        comment: Description of the product to be displayed on the web site
      product:
        type: object
        options:
          structures: _structures.products
    output: true
  general:
    path: data
    name: Redirects
    filter:
      base: none
      include:
        - redirects.yaml
    output: false
collections_config_override: true
collection_groups:
  - heading: Landing Pages
    collections:
      - main_pages
      - regular_pages
  - heading: Other
    collections:
      - adventures
      - posts
      - events
      - trip_ideas
      - stores
      - lodgings
      - tour_equipments
      - products
  - heading: General
    collections:
      - general
_enabled_editors:
  - content
  - data
  - source
_inputs:
  copy:
    type: markdown
  content:
    type: markdown
  description:
    type: markdown
  template:
    hidden: true
  draft:
    type: switch
  units:
    type: number
  tags:
    type: multiselect
    comment: Options are suggestions only, to add a tag, simply type it in the field.
    options:
      values: _select_data.tags
      allow_create: true
  aliases:
    type: array
  aliases[*]:
    type: text
  warning:
    hidden: true
    type: switch
    comment: Should the post display the Blog's warning?
  warning_copy:
    type: markdown
    hidden: warning
  url:
    type: text
  layout:
    label: Layout
    comment: Choose Layout/Sidebar for Your Page
  startdate:
    type: text
    label: Start Date
    comment: 'IMPORTANT: Date must be entered YYYY-MM-DD (NO Time)'
  enddate:
    type: text
    label: End Date
    comment: 'IMPORTANT: Date must be entered YYYY-MM-DD (NO Time)'
  ctas:
    type: array
    label: CTAs
    comment: Add CTAs to be invoked with the 'ctas' shortcode or else.
  property_category:
    type: multiselect
    options:
      values: _select_data.property_categories
  street2:
    label: Street 2
  website:
    type: url
    comment: Website's URL. Must include protocole (https://)
  boxes:
    label: Masonry Items
    type: array
  desktoptitle:
    type: text
    label: Title for Desktop
  mobiletitle:
    type: text
    label: Title for Mobile
  hovertitle:
    type: text
    label: Hover Title
    comment: The title displayed on mouse hover
  hoverdescription:
    type: textarea
    label: Hover Description
    comment: The text displayed on mouse hover
  photo:
    type: image
    label: Page Hero Image
    comment: Image Size 2048px x 530px
  photo_mobile: input-image
  mobilephoto:
    type: image
    label: Image for Mobile
  desktopphoto:
    type: image
    label: Image for Desktop
  photo_name:
    type: image
    label: Image
  photo_alt:
    label: Image Alternate Attribute
  largeboxphoto:
    type: image
    label: Large
    comment: Image Size 1024px x 395px
  mediumboxphoto:
    type: image
    label: Medium
    comment: Image Size 667px x 355px
  smallboxphoto:
    type: image
    label: Small
    comment: Image Size 340px x 214px
  slideshow:
    type: array
    options:
      image_key: photo
      structures: _structures.slideshow
  home_slashes:
    type: array
    options:
      structures: _structures.home_slashes
  masonry1:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry2:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry3:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry4:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry5:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry6:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  masonry7:
    type: object
    text_key: desktoptitle
    options:
      structures: _structures.masonry
  gallery:
    type: array
    options:
      structures:
        values:
          value:
            title: null
            image: null
  seo:
    type: object
    options:
      structures:
        values:
          _inputs:
            imgalt:
              label: Image Alternative Text
            description: input-minimal-markdown
          value:
            title: null
            description: null
            imgalt: null
            image: null
  address:
    type: object
    options:
      structures:
        values:
          value:
            city: null
            state: null
            street: null
            street2: null
            zip: null
  coordinates:
    type: object
    options:
      structures:
        values:
          _inputs:
            lat:
              label: Latitude
            lng:
              label: Longitude
          value:
            lat: null
            lng: null
_select_data:
  layouts:
    - contact
    - adventures
    - calendarpage
    - eventspage
    - gallery
    - search
    - meeting-planners
    - meeting-planners-sub
    - our-area
    - press-media-industry
    - open-meetings
    - relocation-request
    - thank-you
    - travelersinfo
    - lodgingpage
    - diningpage
    - equipment
    - headless
    - home
    - nosidebar
  categories:
    - Arts & Culture
    - Clamming
    - Crabbing
    - Fishing
    - Itineraries
    - Local Food & Drink
    - Local Spotlight
    - Miscellaneous
    - Oregon's Adventure Coast News & Info
    - Outdoor Adventures
    - Shopping & Entertainment
    - Special Events & Holidays
    - State Parks & National Lands
  property_categories:
    - Antiques
    - Arts & Crafts
    - Bookstores
    - Boutique
    - Clothing
    - Fitness
    - Florist
    - Groceries
    - Hardware
    - Herbals
    - Home Goods
    - Personal services
    - Pet Products
    - Pharmacy
    - Resale
    - Shoes
    - Souvenirs
    - Specialty Foods
    - Sporting Goods
    - Vitamins
    - Liquor Stores/ Growler Fills
  towns:
    - charleston
    - coos-bay
    - north-bend
  adventures:
    - atving-motorsports
    - beach
    - crabbing-clamming
    - culture-museums
    - dunes
    - eat-drink
    - fishing
    - fishing-crabbing-clamming
    - historical
    - lighthouses
    - scenic-drives
    - shopping
    - state-parks-national-lands
  durations:
    - full-day
    - half-day
    - long-weekend
  tags:
    - something
    - other
_structures:
  accordion_sections:
    values:
      value:
        title: null
        accordions: null
  accordions:
    values:
      _inputs:
        content:
          label: Accordion Content
      value:
        title: null
        content: null
  ctas:
    values:
      _inputs:
        title: The text on the button
      value:
        title: null
        url: null
        action: null
        image: null
  masonry:
    values:
      text_key: desktoptitle
      value:
        desktoptitle: null
        desktopphoto: null
        hovertitle: null
        hoverdescription: null
        mobiletitle: null
        url: null
  boxes:
    values:
      text_key: desktoptitle
      value:
        desktoptitle: null
        desktopphoto: null
        hovertitle: null
        hoverdescription: null
        mobiletitle: null
        url: null
  home_splashes:
    values:
      _inputs:
        img:
          type: image
      value:
        url: null
        img: null
        alt: null
  slideshow:
    values:
      _inputs:
        title:
          comment: The title of the slide
        photo:
          label: Image
          comment: The image of the slide
        title_mobile:
          label: Title on mobile
          comment: The text to be displayed on mobile
        photo_mobile:
          type: image
          label: Image on mobile
          comment: The image used on mobile
        url:
          label: URL
          comment: The URL of the page opened when the slide is clicked
        video:
          type: object
          comment: The video displayed in the carousel slid, Instead of a photo
          options:
            structures: _structures.videos
      value:
        title: null
        photo: null
        title_mobile: null
        photo_mobile: null
        url: null
        video: null
  videos:
    values:
      _inputs:
        cover:
          type: file
        source:
          type: file
      value:
        cover: null
        source: null
  custom_fields:
    style: modal
    id_key: id
    values:
      - label: Product Field Size
        _inputs:
          id:
            hidden: true
          options:
            type: array
        value:
          id: size
          name: Size
          options:
            - S
            - M
            - L
  products:
    values:
      _inputs:
        id:
          comment: Will be used as product ID in the store back office
        price:
          type: number
        weight:
          type: number
          comment: The weight of the product in grams
        description:
          comment: ''
      value:
        id: null
        price: null
        weight: null
        description: null
        custom_fields: null
_editables:
  content:
    image_size_attributes: false
    blockquote: true
    link: true
    bold: true
    format: p h1 h2 h3 h4 h5 h6
    italic: true
    strike: false
    subscript: false
    superscript: false
    underline: true
    bulletedlist: true
    indent: false
    numberedlist: true
    outdent: false
    code: false
    embed: true
    horizontalrule: false
    image: true
    table: true
    undo: true
    redo: true
    removeformat: true
    copyformatting: true
    center: text-center
    left: text-left
    right: text-right
    snippet: true
  block:
    image_size_attributes: false
    blockquote: true
    link: true
    bold: true
    format: p h1 h2 h3 h4 h5 h6
    italic: true
    strike: false
    subscript: false
    superscript: false
    underline: true
    bulletedlist: true
    indent: false
    numberedlist: true
    outdent: false
    code: false
    embed: true
    horizontalrule: false
    image: true
    table: true
    undo: true
    redo: true
    removeformat: true
    copyformatting: true
    center: text-center
    left: text-left
    right: text-right
    snippet: true
  text:
    italic: true
    bold: true
base_url: ''
data_config:
  states: true
editor: null
source_editor: null
timezone: America/Los_Angeles
