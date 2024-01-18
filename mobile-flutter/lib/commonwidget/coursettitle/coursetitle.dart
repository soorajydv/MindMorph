import 'package:flutter/material.dart';
import 'package:morph/const/color.dart';
import 'package:morph/const/fonts.dart';
import 'package:velocity_x/velocity_x.dart';

Widget featurelistRow({image, String? name}) {
  return Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
    children: [
      Image.asset(
        image,
        width: 150,
        height: 100,
        fit: BoxFit.fill,
      ),
      // 5.widthBox,
      name!.text.fontFamily(semibold).color(titlecolor).make(),
    ],
  )
      .box
      .width(190)
      .height(150)
      .margin(const EdgeInsets.symmetric(horizontal: 1))
      .color(themecolor)
      .padding(const EdgeInsets.all(4))
      .roundedSM
      .outerShadowSm
      .make();
}
