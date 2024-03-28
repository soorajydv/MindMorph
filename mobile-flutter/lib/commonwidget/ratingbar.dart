import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

Widget ratingbar(double size, double paddingsize, int starcount) {
  double initialRating = 5;
  Color unratedColor = const Color.fromARGB(255, 255, 255, 255);
  return Center(
    child: Row(
      children: [
        RatingBar.builder(
          initialRating: initialRating,
          minRating: 1,
          direction: Axis.horizontal,
          allowHalfRating: true,
          itemCount: starcount,
          itemSize: size,
          itemPadding: EdgeInsets.symmetric(horizontal: 0.1 * paddingsize),
          itemBuilder: (context, index) {
            if (index < initialRating) {
              return Icon(
                Icons.star,
                color: Colors.amber, // Color for rated stars
              );
            } else {
              return Icon(
                Icons.star_border,
                color: unratedColor, // Color for unrated stars
              );
            }
          },
          onRatingUpdate: (rating) {},
        ),
      ],
    ),
  );
}
