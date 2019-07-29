import re, string, sys

stops = set(open("../stop_words.txt").read().split(",") + list(string.ascii_lowercase))
words = [x.lower() for x in re.split("[ˆa-zA-Z]+", open(sys.argv[1]).read()) if len(x)> 0 and x.lower() not in stops]
unique_words = list(set(words))
## these two line are the one modiified 
counts = words.count(w) for w in unique_words 
unique_words.sort(lambda x, y: cmp(counts(y), counts(x)))
print "\n".join(["%s - %s" % (x, words.count(x)) for x in unique_words[:25]])
