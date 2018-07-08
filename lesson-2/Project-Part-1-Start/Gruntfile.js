/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ["css/main.css", "index.html"],
        tasks: ["cssmin"]
      }
    },

    cssmin: {
      target: {
        files: {
          "css/main.min.css": ["css/main.css"]
        }
      }
    },

    responsive_images: {
      dev: {
        options: {
          engine: "im",
          sizes: [
            {
              name: "small",
              width: 320,
              quality: 20
            },
            {
              name: "medium",
              width: 640,
              quality: 40
            },
            {
              name: "large",
              width: 1024,
              quality: 60
            }
          ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [
          {
            expand: true,
            src: ["*.{gif,jpg,png}"],
            cwd: "images_src/",
            dest: "images/"
          }
        ]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ["images"]
      }
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ["images"]
        }
      }
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [
          {
            expand: true,
            src: "fixed/*.{gif,jpg,png}",
            cwd: "images_src/",
            dest: "images/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-responsive-images");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-mkdir");
  grunt.registerTask("default", [
    "cssmin",
    "clean",
    "mkdir",
    "copy",
    "responsive_images"
  ]);
};
