<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

# supra-3d

Mobile application to control PrusaLink compatible 3D printers

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Release][release-shield]][release-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!--
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
-->

<!-- ABOUT THE PROJECT -->

## About The Project

All new Prusa 3D printers with 32bit controller have PrusaLink pre-installed. PrusaLink ennables the user to have a web-interface to control the 3d printer. This project builds on top of the Prusa API to enable the user to use a native app to control the printer from within the network.

### Built With

[![React][ReactNative.dev]][ReactNative-url]
[![Expo][Expo.dev]][Expo-url]
[![TanStackQuery][TanStackQuery.dev]][TanStackQuery-url]
[![React-Native-Paper][RNP.dev]][RNP-url]
[![Recoil][Recoil.dev]][Recoil-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LOCAL DEVELOPMENT -->

## Local Development

To run the application locally there are two possibilites:

1. Through expo on a device emulator or expo app on the phone
   - Rename `.env.template` to `.env.local`
   - Ensure to comment `EXPO_PUBLIC_PROXY_URL` in `.env.local`
   - Start application `npm run start`
2. Through web interface
   - Rename `.env.template` to `.env.local`
   - Ensure to un-comment `EXPO_PUBLIC_PROXY_URL` in `.env.local`
   - Replace `PRUSA-HOSTNAME` in `package.json` with the hostname/IP of your printer
   - start proxy and keep it running `npm run proxy`
   - Start application `npm run start`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the GNU GPL v3.0 License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joachim Klug - github@joachimklug.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[release-shield]: https://img.shields.io/github/release/joachimklug/supra-3d.svg?style=for-the-badge
[release-url]: https://github.com/joachimklug/supra-3d/releases
[contributors-shield]: https://img.shields.io/github/contributors/joachimklug/supra-3d.svg?style=for-the-badge
[contributors-url]: https://github.com/joachimklug/supra-3d/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/joachimklug/supra-3d.svg?style=for-the-badge
[forks-url]: https://github.com/joachimklug/supra-3d/network/members
[stars-shield]: https://img.shields.io/github/stars/joachimklug/supra-3d.svg?style=for-the-badge
[stars-url]: https://github.com/joachimklug/supra-3d/stargazers
[issues-shield]: https://img.shields.io/github/issues/joachimklug/supra-3d.svg?style=for-the-badge
[issues-url]: https://github.com/joachimklug/supra-3d/issues
[license-shield]: https://img.shields.io/github/license/joachimklug/supra-3d.svg?style=for-the-badge
[license-url]: https://github.com/joachimklug/supra-3d/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/joachimklug
[ReactNative.dev]: https://img.shields.io/badge/ReactNative-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[ReactNative-url]: https://reactnative.dev
[Expo.dev]: https://img.shields.io/badge/Expo-20232A?style=for-the-badge&logo=expo&logoColor=000020
[Expo-url]: https://expo.dev
[TanStackQuery.dev]: https://img.shields.io/badge/TanStack_Query-20232A?style=for-the-badge&logo=reactquery&logoColor=FF4154
[TanStackQuery-url]: https://tanstack.com/query/
[RNP.dev]: https://img.shields.io/badge/React--native--paper-20232A?style=for-the-badge&logo=react-native-paper&logoColor=000020
[RNP-url]: https://callstack.github.io/react-native-paper
[recoil.dev]: https://img.shields.io/badge/Recoil-20232A?style=for-the-badge&logo=recoil&logoColor=3578E5
[recoil-url]: https://callstack.github.io/react-native-paper

