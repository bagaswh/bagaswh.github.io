import { ElementContent } from './src/ts/ui/content-renderer';

export let content: ElementContent[] = [
  // Discrete math
  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Matematika Diskrit'
        }
      },
      {
        tag: 'p',
        content: {
          textContent:
            'Tidak wajib belajar matematika diskrit. Meskipun begitu, mempelajari materi ini dapat membantu dalam memahami materi-materi yang lain.'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'h3',
            content: {
              textContent: 'Kursus gratis'
            }
          },
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-042j-mathematics-for-computer-science-fall-2010/video-lectures/'
                    },
                    content: {
                      textContent: 'Mathematics for Computer Science'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.youtube.com/playlist?list=PLUpS0WwSvA3e7HtgzNHMivo0T8V0etX_Z'
                    },
                    content: {
                      textContent: 'Discrete Mathematics - Rosen (YouTube)'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.dropbox.com/sh/hnex3q2yh3cpxl4/AACLIyx1fNxHwG49EqBbTRI1a?dl=0'
                    },
                    content: {
                      textContent: 'Slide dari Seto Aji Rinengkuh'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  //
  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Algoritma dan Struktur Data'
        }
      },
      {
        tag: 'p',
        content: {
          textContent: 'Wajib.'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'h3',
            content: {
              textContent: 'Kursus gratis'
            }
          },
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x'
                    },
                    content: {
                      textContent:
                        'CS50 Introduction to Computer Science by Harvard'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.udemy.com/introduction-to-algorithms-and-data-structures-in-c/'
                    },
                    content: {
                      textContent: 'Algorithms and Data Structures for C++'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'http://web.stanford.edu/class/cs97si/'
                    },
                    content: {
                      textContent:
                        'CS97SI: Introduction to Programming Contests, by Stanford'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'http://datastructur.es/sp16/'
                    },
                    content: {
                      textContent: 'Data Structures, Spring 2016, by UC Berkley'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'http://people.seas.harvard.edu/~minilek/cs224/fall14/index.html'
                    },
                    content: {
                      textContent: 'CS 224: Advanced Algorithms'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'http://theory.stanford.edu/~tim/w16/w16.html'
                    },
                    content: {
                      textContent: 'CS 261: A Second Course in Algorithms'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'C++'
        }
      },
      {
        tag: 'div',
        children: [
          {
            tag: 'h3',
            content: {
              textContent: 'Website'
            }
          },
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'https://learncpp.com'
                    },
                    content: {
                      textContent: 'LearnCPP'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Online Judge'
        }
      },
      {
        tag: 'p',
        content: {
          textContent: 'Website tempat latihan dan mengasah skill.'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'h3',
            content: {
              textContent: 'Website'
            }
          },
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'https://spoj.com/'
                    },
                    content: {
                      textContent: 'SPOJ'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.youtube.com/playlist?list=PLUpS0WwSvA3e7HtgzNHMivo0T8V0etX_Z'
                    },
                    content: {
                      textContent: 'Discrete Mathematics - Rosen (YouTube)'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'https://codeforces.com/'
                    },
                    content: {
                      textContent: 'Codeforces'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'http://train.usaco.org/usacogate'
                    },
                    content: {
                      textContent: 'USACO'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // NEW SECTION
  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Tutorial'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.geeksforgeeks.org/how-to-begin-with-competitive-programming/'
                    },
                    content: {
                      textContent: 'How to begin with Competitive Programming?'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.geeksforgeeks.org/practice-for-cracking-any-coding-interview/'
                    },
                    content: {
                      textContent: 'Practice for cracking any coding interview'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.geeksforgeeks.org/top-algorithms-and-data-structures-for-competitive-programming/'
                    },
                    content: {
                      textContent:
                        'Top 10 Algorithms and Data Structures for Competitive Programming'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.geeksforgeeks.org/how-to-prepare-for-acm-icpc/'
                    },
                    content: {
                      textContent: 'How to prepare for ACM – ICPC?'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.geeksforgeeks.org/fast-io-for-competitive-programming/'
                    },
                    content: {
                      textContent: 'Fast I/O for Competitive Programming'
                    }
                  }
                ]
              },
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.quora.com/How-do-I-learn-C++-for-Competitive-Programming-1'
                    },
                    content: {
                      textContent:
                        'How do I learn C++ for Competitive Programming'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Contoh soal'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://practice.geeksforgeeks.org/explore/?problemType=full&difficulty%5B%5D=-2&page=1'
                    },
                    content: {
                      textContent: 'Geeksforgeeks practice'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  {
    tag: 'section',
    attributes: {
      class: 'category'
    },

    children: [
      {
        tag: 'h2',
        content: {
          textContent: 'Rekomendasi urutan belajar'
        }
      },

      {
        tag: 'div',
        children: [
          {
            tag: 'ul',
            // start list
            children: [
              {
                tag: 'li',
                content: {
                  textContent: 'Matematika diskrit.'
                },
                children: [
                  {
                    tag: 'p',
                    content: {
                      textContent: 'Opsional. Boleh di-skip.'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x'
                    },
                    content: {
                      textContent: 'CS50 Introduction to Computer Science'
                    }
                  },
                  {
                    tag: 'p',
                    content: {
                      textContent: 'Opsional. Boleh di-skip.'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href:
                        'https://www.udemy.com/introduction-to-algorithms-and-data-structures-in-c/'
                    },
                    content: {
                      textContent: 'Algorithms and Data Structures for C++'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                children: [
                  {
                    tag: 'a',
                    attributes: {
                      href: 'http://web.stanford.edu/class/cs97si/'
                    },
                    content: {
                      textContent:
                        'CS97SI: Introduction to Programming Contests, by Stanford'
                    }
                  }
                ]
              },

              {
                tag: 'li',
                content: {
                  textContent: 'Latihan terooosss'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
