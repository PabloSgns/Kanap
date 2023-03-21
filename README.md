<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/PabloSgns/Kanap">
    <img src="https://github.com/PabloSgns/Kanap/blob/main/front/images/logo.png" alt="Logo" width="350" height=400">
  </a>

<h3 align="center">Kanap</h3>

  <p align="center">
    This project is the n°5 of OpenClassrooms Web Developper course which consists in building an e-commerce website with JavaScript.
    <br />
    <br />
    <a href="https://github.com/PabloSgns/Kanap"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#requested-features">Requested features</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
    <img src="https://github.com/PabloSgns/Kanap/blob/main/front/images/screenshot_readme.png" alt="Logo" width="900" height="450">
</div>

<br/>
The goal is to unify the work by dynamically integrating the API elements into the different web pages with Javascript, the front-end and API code being provided at the start of the project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

* HTML5
* CSS3
* Javascript

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

1. You will need to have <a href="https://nodejs.org/en">Node.js</a> installed on your computer.

2. Clone the repo
   ```sh
   git clone https://github.com/PabloSgns/Kanap.git
   ```
   
3. Go to the "back" folder and install npm
    ```sh
    npm install
    ```
4. Then from the same folder, you can run the server with
    ```sh
    node server
    ```
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->
## Requested features

### Homepage

This page presents all the products returned by the API. For each product, you will have to display its image, as well as its name and the beginning of its description. By clicking on the product, the user will be redirected to the product page to view it in more detail.

### Product page

This page presents a single product; it will have a drop-down menu allowing the user to choose a customization option, as well as an input to enter the quantity. These elements must be taken into account in the basket.

### Cart page

On this page, the user will be able to modify the quantity of a product in his basket; at this time, the total of the basket should be updated. The user will also have the possibility to delete a product from his basket, the product will therefore have to disappear from the page. User inputs must be parsed and validated to verify the format and type of data before sending to the API. For example, it would not be acceptable to accept a first name containing numbers, or an e-mail address that does not contain an “@” symbol. In the event of an input problem, an error message should be displayed below the corresponding field.
Be careful not to store the price of items locally. The data stored locally is not secure and the user could then change the price himself.

In the shopping cart, the products must always appear grouped by model and color. If a product is added to the cart multiple times, with the same color, it should only appear once, but with the adjusted number of copies. If a product is added to the cart multiple times, but with different colors, it should appear in two separate lines with the corresponding color and quantity shown each time.

### Confirmation page

On this page, the user should see his order number displayed. It will be necessary to ensure that this number is not stored anywhere.

### Good to know

The post request that must be made to place an order does not yet take into account the quantity or color of the products purchased.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Author : Pablo Sagnes

You can reach me on <a href="https://www.linkedin.com/in/pablo-sagnes-8068a7143/">Linkedin</a> or by <a href="mailto:sagnes.pablo@gmail.com">email</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
