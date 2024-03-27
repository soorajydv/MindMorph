import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

Widget ratingbar() {
  double initialRating = 5;
  Color unratedColor = const Color.fromARGB(255, 255, 255, 255);
  return Center(
    child: Transform.scale(
      scale: 0.5,
      child: RatingBar.builder(
        initialRating: initialRating,
        minRating: 1,
        direction: Axis.horizontal,
        allowHalfRating: true,
        itemCount: 5,
        itemPadding: const EdgeInsets.symmetric(horizontal: 4.0),
        itemBuilder: (context, index) {
          if (index < initialRating) {
            return const Icon(
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
    ),
  );
}
