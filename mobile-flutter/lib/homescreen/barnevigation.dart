import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:morph/Controller/homecontroller.dart';
import 'package:morph/const/color.dart';
import 'package:morph/homescreen/assingmnet/asignmentlist.dart';
import 'package:morph/homescreen/homepage.dart';
import 'package:morph/homescreen/searchpage.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    var controller = Get.put(HomeController());
    var navigitem = const [
      BottomNavigationBarItem(
        icon: Icon(Icons.assignment),
        label: 'Assignment',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.home),
        label: 'Home',
      ),
      BottomNavigationBarItem(
        icon: Icon(Icons.search),
        label: 'Search',
      ),
    ];

    var itembody = [
      assignmentlist(),
      Homepage(),
      Search(),
    ];
    return Scaffold(
      body: Column(
        children: [
          Obx(() => Expanded(
              child: itembody.elementAt(controller.currentnavIndex.value))),
        ],
      ),
      bottomNavigationBar: Obx(
        () => BottomNavigationBar(
          currentIndex: controller.currentnavIndex.value,
          selectedItemColor: Color.fromARGB(255, 253, 252, 255),
          unselectedItemColor: titlecolor,
          backgroundColor: boxcolor,
          type: BottomNavigationBarType.fixed,
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.bold),
          items: navigitem,
          onTap: (value) => controller.currentnavIndex.value = value,
        ),
      ),
    );
  }
}
