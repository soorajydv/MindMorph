import 'package:flutter/material.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:velocity_x/velocity_x.dart';

class Buypage extends StatefulWidget {
  const Buypage({super.key});

  @override
  State<Buypage> createState() => _BuypageState();
}

class _BuypageState extends State<Buypage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: boxcolor,
        shadowColor: Colors.white,
        title: Text(
          'Buy',
          style: TextStyle(color: Colors.white),
        ),
      ),
      backgroundColor: themecolor,
      body: Center(
        child: Container(
          alignment: Alignment.topCenter,
          decoration: BoxDecoration(
              color: boxtilecolor,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: FeatureColor)),
          height: MediaQuery.of(context).size.height * 0.5,
          width: 350,
          child: Column(
            children: [
              Row(children: [
                GestureDetector(
                  onTap: () {
                    showModalBottomSheet(
                        backgroundColor: boxtilecolor,
                        context: context,
                        builder: (BuildContext context) {
                          return SizedBox(
                            height: 600,
                            child: Center(
                              child: Container(
                                child: Column(
                                  children: [
                                    80.heightBox,
                                    Container(
                                      decoration: BoxDecoration(
                                          color: themecolor,
                                          border: Border.all(
                                              width: 1, color: Colors.white),
                                          borderRadius:
                                              BorderRadius.circular(30)),
                                      height:
                                          MediaQuery.of(context).size.height *
                                              0.3,
                                      width: MediaQuery.of(context).size.width *
                                          0.8,
                                      child: Column(
                                        children: [
                                          40.heightBox,
                                          Align(
                                            alignment: Alignment.center,
                                            child: Row(
                                              children: [
                                                55.widthBox,
                                                'Course name:'
                                                    .text
                                                    .size(16)
                                                    .color(titlecolor)
                                                    .fontFamily(bold)
                                                    .make(),
                                                const SizedBox(
                                                    width:
                                                        5), // Add some space between the two texts
                                                'Flutter Course Basic'
                                                    .text // Second text widget
                                                    .size(12)
                                                    .color(FeatureColor)
                                                    .fontFamily(bold)
                                                    .make(),
                                              ],
                                            ),
                                          ),
                                          10.heightBox,
                                          Align(
                                            alignment: Alignment.center,
                                            child: Row(
                                              children: [
                                                55.widthBox,
                                                'Price:'
                                                    .text
                                                    .size(16)
                                                    .color(titlecolor)
                                                    .fontFamily(bold)
                                                    .make(),
                                                const SizedBox(
                                                    width:
                                                        5), // Add some space between the two texts
                                                '800'
                                                    .text // Second text widget
                                                    .size(12)
                                                    .color(FeatureColor)
                                                    .fontFamily(bold)
                                                    .make(),
                                              ],
                                            ),
                                          ),
                                          10.heightBox,
                                          Align(
                                            alignment: Alignment.center,
                                            child: Row(
                                              children: [
                                                55.widthBox,
                                                'Date of purchase:'
                                                    .text
                                                    .size(16)
                                                    .color(titlecolor)
                                                    .fontFamily(bold)
                                                    .make(),
                                                const SizedBox(
                                                    width:
                                                        5), // Add some space between the two texts
                                                'May 4,2024'
                                                    .text // Second text widget
                                                    .size(12)
                                                    .color(FeatureColor)
                                                    .fontFamily(bold)
                                                    .make(),
                                              ],
                                            ),
                                          ),
                                          10.heightBox,
                                        ],
                                      ),
                                    ),
                                    30.heightBox,
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                                backgroundColor: themecolor,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(20),
                                                ),
                                                padding: EdgeInsets.symmetric(
                                                    vertical: 10,
                                                    horizontal: 50)),
                                            onPressed: () {
                                              Navigator.pop(context);
                                            },
                                            child: Text(
                                              'OK',
                                              style: TextStyle(
                                                  color: Colors.white),
                                            )),
                                        ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                                backgroundColor: themecolor,
                                                shape: RoundedRectangleBorder(
                                                  borderRadius:
                                                      BorderRadius.circular(20),
                                                ),
                                                padding: EdgeInsets.symmetric(
                                                    vertical: 10,
                                                    horizontal: 30)),
                                            onPressed: () {
                                              Navigator.pop(context);
                                            },
                                            child: Text(
                                              'Confirm',
                                              style: TextStyle(
                                                  fontSize: 14,
                                                  color: Colors.white),
                                            )),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        });
                  },
                  child: Container(
                    decoration: BoxDecoration(
                        color: themecolor,
                        border: Border.all(width: 1, color: Colors.white),
                        borderRadius: BorderRadius.circular(20)),
                    alignment: Alignment.centerLeft,
                    // ignore: sort_child_properties_last
                    child: Align(
                      alignment: Alignment.center,
                      child: 'Buy'
                          .text
                          .fontFamily(regular)
                          .color(Colors.white)
                          .make(),
                    ),
                    height: 60,
                    width: 100,
                  ),
                ),
                GestureDetector(
                  onTap: () {},
                  child: Container(
                    decoration: BoxDecoration(
                        color: boxtilecolor,
                        border: Border.all(width: 1, color: Colors.white),
                        borderRadius: BorderRadius.circular(20)),
                    alignment: Alignment.centerLeft,
                    // ignore: sort_child_properties_last
                    child: Align(
                      alignment: Alignment.center,
                      child: 'Cart'
                          .text
                          .fontFamily(regular)
                          .color(Colors.white)
                          .make(),
                    ),
                    height: 60,
                    width: 100,
                  ),
                ),
              ])
            ],
          ),
        ),
      ),
    );
  }
}
