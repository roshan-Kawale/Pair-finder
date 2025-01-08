"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { Room } from "@/db/schema";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Room name must be at least 1 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "At least one tag is required.",
  }),
  language: z.array(z.string()).min(1, {
    message: "At least one language is required.",
  }),
  level: z.string({
    required_error: "Please select a level.",
  }),
  maximumPeople: z.number().min(2).max(100),
});

export function EditRoomForm({ room }: { room: Room }) {
  const params = useParams();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room?.name,
      description: room?.description ?? "",
      tags: room?.tags,
      language: room?.language ?? [],
      level: room?.level ?? "",
      maximumPeople: room?.maximumPeople ?? 10,
    },
  });

  const [tags, setTags] = useState<string[]>(room?.tags);
  const [language, setLanguage] = useState<string[]>(room?.language ?? []);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      form.setValue("tags", [...tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    form.setValue("tags", updatedTags);
  };

  const addlang = (lang: string) => {
    if (lang && !language.includes(lang)) {
      setLanguage([...language, lang]);
      form.setValue("language", [...language, lang]);
    }
  };

  const removelang = (langToRemove: string) => {
    const updatedLang = language.filter((lang) => lang !== langToRemove);
    setLanguage(updatedLang);
    form.setValue("language", updatedLang);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    });
    toast({
      title: "Room Updated",
      description: "Your room was successfully updated",
    });
  }

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit a Room</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter room name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of your discussion room.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the room's topic"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a brief description of the room&apos;s purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                        <Input
                          placeholder="Add a tag"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTag((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>Press Enter to add a tag.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={() => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2">
                        {language?.map((lang) => (
                          <span
                            key={lang}
                            className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm flex items-center"
                          >
                            {lang}
                            <button
                              type="button"
                              onClick={() => removelang(lang)}
                              className="ml-2"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                        <Input
                          placeholder="Add a Language"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addlang((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = "";
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Press Enter to add a Language.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the experience level for the room.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maximumPeople"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum People</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the maximum number of participants (2-100).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Edit Room
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
