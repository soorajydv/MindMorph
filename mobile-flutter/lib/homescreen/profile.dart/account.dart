import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:morph/const/color.dart';
import 'package:morph/homescreen/barnevigation.dart';
import 'package:morph/homescreen/profile.dart/acountdetaildemo.dart';
import 'package:velocity_x/velocity_x.dart';

class Acount extends StatefulWidget {
  const Acount({super.key});

  @override
  State<Acount> createState() => _AcountState();
}

class _AcountState extends State<Acount> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(12),
        color: themecolor,
        width: context.screenWidth,
        height: context.screenHeight,
        child: SingleChildScrollView(
          child: Column(
            children: [
              SafeArea(
                  child: Column(
                children: [
                  Row(
                    children: [
                      IconButton(
                          onPressed: () {
                            Get.to(() => const Home());
                          },
                          icon: const Icon(
                            Icons.arrow_back,
                            color: FeatureColor,
                          )),
                      90.widthBox,
                      Align(
                        alignment: Alignment.center,
                        child: "My profile"
                            .text
                            .color(FeatureColor)
                            .bold
                            .size(18)
                            .make(),
                      ),
                    ],
                  ),
                  20.heightBox,
                  Container(
                    padding: const EdgeInsets.all(8),
                    height: 170,
                    width: 350,
                    decoration: BoxDecoration(
                        color: listcolor,
                        borderRadius: BorderRadius.circular(40)),
                    child: Column(
                      children: [
                        Row(
                          children: [
                            Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                20.heightBox,
                                "Sobin rai "
                                    .text
                                    .size(20)
                                    .align(TextAlign.left)
                                    .bold
                                    .make(),
                                "sobin@gmail.com"
                                    .text
                                    .size(15)
                                    .semiBold
                                    .align(TextAlign.left)
                                    .color(
                                        const Color.fromARGB(255, 97, 93, 93))
                                    .make(),
                                20.heightBox,
                                const Icon(
                                  FontAwesomeIcons.userGraduate,
                                  color: Color.fromARGB(255, 162, 155, 155),
                                )
                              ],
                            ),
                            130.widthBox,
                            Column(children: [
                              Container(
                                alignment: Alignment.centerRight,
                                decoration: const BoxDecoration(
                                  shape: BoxShape.circle,
                                ),
                                child: ClipOval(
                                  child: Image.network(
                                    'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTGNBuKZS2dQ8gViURYxqj0ih63BJgwf4e1KAPzMc1AyYVjDkc_',
                                    width: 75,
                                    fit: BoxFit.cover,
                                  ),
                                ),
                              ),
                              10.heightBox,
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: [
                                  IconButton(
                                      onPressed: () {},
                                      icon: const Icon(
                                        FontAwesomeIcons.exchangeAlt,
                                        color:
                                            Color.fromARGB(31, 244, 232, 232),
                                        size: 20,
                                      ))
                                ],
                              )
                            ]),
                          ],
                        ),
                      ],
                    ),
                  ),
                  10.heightBox,
                  const Divider(
                    thickness: 0.5,
                    color: titlecolor,
                    endIndent: 20,
                    indent: 20,
                  ),
                  35.heightBox,
                  ListView(
                    padding: const EdgeInsets.all(10),
                    shrinkWrap: true,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(2),
                        height: 70,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: listcolor,
                        ),
                        alignment: Alignment.center,
                        child: ListTile(
                          leading: const Icon(
                            Icons.person,
                            color: Color.fromARGB(196, 69, 150, 161),
                            size: 30,
                          ),
                          title: const Text('Personal Information'),
                          trailing: IconButton(
                              onPressed: () {
                                Get.to(() => const demopage());
                              },
                              icon: const Icon(
                                Icons.navigate_next,
                                color: Colors.black,
                              )),
                        ),
                      ),
                      5.heightBox,
                      Container(
                        padding: const EdgeInsets.all(2),
                        height: 70,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: listcolor,
                        ),
                        alignment: Alignment.center,
                        child: ListTile(
                          leading: const Icon(
                            FontAwesomeIcons.bookOpen,
                            color: Color.fromARGB(162, 22, 49, 58),
                            size: 40,
                          ),
                          title: const Text('Book and Notes'),
                          trailing: IconButton(
                              onPressed: () {
                                Get.to(() => const demopage());
                              },
                              icon: const Icon(
                                Icons.navigate_next,
                                color: Colors.black,
                              )),
                        ),
                      ),
                      5.heightBox,
                      Container(
                        padding: const EdgeInsets.all(2),
                        height: 70,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: listcolor,
                        ),
                        alignment: Alignment.center,
                        child: ListTile(
                          leading: const Icon(
                            Icons.assessment,
                            color: Color.fromARGB(255, 175, 115, 97),
                            size: 40,
                          ),
                          title: const Text('Grade'),
                          trailing: IconButton(
                              onPressed: () {
                                Get.to(() => const demopage());
                              },
                              icon: const Icon(
                                Icons.navigate_next,
                                color: Colors.black,
                              )),
                        ),
                      ),
                      5.heightBox,
                      Container(
                        padding: const EdgeInsets.all(2),
                        height: 70,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: listcolor,
                        ),
                        alignment: Alignment.center,
                        child: ListTile(
                          leading: const Icon(
                            Icons.settings,
                            color: Color.fromARGB(255, 29, 8, 68),
                            size: 40,
                          ),
                          title: const Text('Setting & Privacy'),
                          trailing: IconButton(
                              onPressed: () {
                                Get.to(() => const demopage());
                              },
                              icon: const Icon(
                                Icons.navigate_next,
                                color: Colors.black,
                              )),
                        ),
                      ),
                      5.heightBox,
                      Container(
                        height: 70,
                        width: 80,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          color: listcolor,
                        ),
                        alignment: Alignment.center,
                        child: ListTile(
                          leading: const Icon(
                            FontAwesomeIcons.infoCircle,
                            color: Color.fromARGB(255, 122, 121, 121),
                            size: 40,
                          ),
                          title: const Text('About us'),
                          trailing: IconButton(
                              onPressed: () {
                                Get.to(() => const demopage());
                              },
                              autofocus: true,
                              icon: const Icon(
                                Icons.navigate_next,
                                color: Colors.black,
                              )),
                        ),
                      ),
                    ],
                  )
                ],
              )),
            ],
          ),
        ),
      ),
    );
  }
}
