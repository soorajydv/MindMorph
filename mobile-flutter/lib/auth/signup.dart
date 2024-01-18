import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:morph/auth/login.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:velocity_x/velocity_x.dart';

class Signup extends StatefulWidget {
  const Signup({super.key});

  @override
  State<Signup> createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        resizeToAvoidBottomInset: false,
        body: Container(
          color: themecolor,
          child: Padding(
            padding: const EdgeInsets.all(30),
            child: Column(
              children: [
                50.heightBox,
                Align(
                    alignment: Alignment.center,
                    child: Container(
                      child: Lottie.asset('assets/images/signup.json'),
                      height: 180,
                      width: 180,
                    )),
                const Divider(
                  thickness: 2,
                  color: titlecolor,
                  endIndent: 60,
                  indent: 60,
                ),
                30.heightBox,
                Align(
                  alignment: Alignment.centerLeft,
                  child: 'Sign up'
                      .text
                      .color(titlecolor)
                      .size(30)
                      .fontWeight(FontWeight.bold)
                      .fontFamily(bold)
                      .make(),
                ),
                10.heightBox,
                Align(
                  alignment: Alignment.centerLeft,
                  child: 'please fill the inputs below'
                      .text
                      .size(14)
                      .color(subtexColor)
                      .fontFamily(regular)
                      .make(),
                ),
                Column(
                  children: [
                    TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        labelText: 'name',
                      ),
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        labelText: 'Email address',
                      ),
                    ),
                    TextFormField(
                      decoration: const InputDecoration(
                        border: UnderlineInputBorder(),
                        labelText: 'password',
                      ),
                    ),
                    20.heightBox,
                    TextButton(
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromARGB(255, 24, 35, 115)),
                          padding:
                              MaterialStateProperty.all<EdgeInsetsGeometry>(
                            const EdgeInsets.symmetric(
                                horizontal: 20.0, vertical: 10.0),
                          ),
                          shape: MaterialStateProperty.all<OutlinedBorder>(
                            RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                          ),
                          minimumSize: MaterialStateProperty.all<Size>(
                            const Size(200.0,
                                40.0), // Adjust the width and height as needed
                          ),
                        ),
                        onPressed: () {},
                        child: 'Sign Up'
                            .text
                            .color(titlecolor)
                            .fontFamily(regular)
                            .size(18)
                            .make()),
                    30.heightBox,
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        TextButton(
                          onPressed: () {},
                          child: 'Already have an acconut?'
                              .text
                              .color(titlecolor)
                              .fontFamily(semibold)
                              .make(),
                        ),
                        TextButton(
                          onPressed: () {
                            Get.to(() => Login());
                          },
                          child: 'Sign In '
                              .text
                              .color(Redcolor)
                              .fontFamily(semibold)
                              .make(),
                        )
                      ],
                    )
                  ],
                )
              ],
            ),
          ),
        ));
  }
}
