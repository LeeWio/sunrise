"use client";

import {
  Button,
  Card,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { useState, useEffect } from "react";

import { SlashFillIcon, EditIcon, PlusIcon } from "@/components/icons";
import {
  useCreateTagMutation,
  useGetTagsQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
  type Tag,
} from "@/lib/features/tag/tag-api";

export default function AboutPage() {
  // 状态管理
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    color: "#FCF5EE",
    description: "",
    icon: "🏷️",
  });

  // API hooks
  const {
    data: tagsData,
    isLoading: isTagsLoading,
    refetch: refetchTags,
  } = useGetTagsQuery({ page: 1, size: 20 });
  const [createTag, { isLoading: isCreating }] = useCreateTagMutation();
  const [updateTag, { isLoading: isUpdating }] = useUpdateTagMutation();
  const [deleteTag, { isLoading: isDeleting }] = useDeleteTagMutation();

  // 重置表单
  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      color: "#FCF5EE",
      description: "",
      icon: "🏷️",
    });
  };

  // 开始编辑
  const startEdit = (tag: Tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug || "",
      color: tag.color || "#FCF5EE",
      description: tag.description || "",
      icon: tag.icon || "🏷️",
    });
  };

  // 开始删除
  const startDelete = (tag: Tag) => {
    setDeletingTag(tag);
  };

  // 处理创建 Tag
  const handleCreateTag = async () => {
    try {
      await createTag(formData).unwrap();
      setShowCreateForm(false);
      resetForm();
      refetchTags();
      alert("Tag created successfully!");
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };

  // 处理更新 Tag
  const handleUpdateTag = async () => {
    if (!editingTag?.tid) return;

    try {
      await updateTag({
        tid: editingTag.tid,
        ...formData,
      }).unwrap();
      setEditingTag(null);
      resetForm();
      refetchTags();
      alert("Tag updated successfully!");
    } catch (error) {
      console.error("Failed to update tag:", error);
    }
  };

  // 处理删除 Tag
  const handleDeleteTag = async () => {
    if (!deletingTag?.tid) return;

    try {
      await deleteTag(deletingTag.tid).unwrap();
      setDeletingTag(null);
      refetchTags();
      alert("Tag deleted successfully!");
    } catch (error) {
      console.error("Failed to delete tag:", error);
    }
  };

  // 自动生成 slug
  useEffect(() => {
    const generatedSlug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.name]);

  // Tag 表单项组件
  const TagForm = ({
    isEdit = false,
    editingTag,
  }: {
    isEdit?: boolean;
    editingTag?: Tag | null;
  }) => {
    const formId = isEdit ? "edit-tag-form" : "create-tag-form";

    return (
      <div className="w-[400px] space-y-5">
        {/* 标题 */}
        <div className="pb-2 border-b border-default-200">
          <h3 className="text-lg font-semibold">
            {isEdit ? `Edit Tag: ${editingTag?.name}` : "Create New Tag"}
          </h3>
        </div>

        {/* 表单字段 */}
        <div className="space-y-4">
          {/* Tag Name */}
          <div className="flex flex-col gap-1">
            <Label isRequired htmlFor={`${formId}-name`}>
              Tag Name
            </Label>
            <Input
              required
              aria-label="Tag Name"
              className="w-full"
              id={`${formId}-name`}
              placeholder="Enter tag name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          {/* Slug */}
          <div className="flex flex-col gap-1">
            <Label isRequired htmlFor={`${formId}-slug`}>
              Slug
            </Label>
            <Input
              required
              aria-label="Slug"
              className="w-full"
              description="Auto-generated from name"
              id={`${formId}-slug`}
              placeholder="URL-friendly identifier"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${formId}-color`}>Color</Label>
            <Input
              aria-label="Color"
              className="w-full"
              id={`${formId}-color`}
              startContent={
                <div
                  className="w-5 h-5 rounded border border-default-200"
                  style={{ backgroundColor: formData.color }}
                />
              }
              type="color"
              value={formData.color}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  color: e.target.value,
                }))
              }
            />
          </div>

          {/* Icon */}
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${formId}-icon`}>Icon</Label>
            <Input
              aria-label="Icon"
              className="w-full"
              id={`${formId}-icon`}
              placeholder="Enter emoji or icon"
              value={formData.icon}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, icon: e.target.value }))
              }
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Label htmlFor={`${formId}-description`}>Description</Label>
            <Input
              aria-label="Description"
              className="w-full"
              id={`${formId}-description`}
              placeholder="Enter tag description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* 预览区域 */}
        <div className="p-4 bg-default-50 rounded-lg border border-default-200">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full border border-default-200 flex items-center justify-center text-white font-semibold text-sm"
              style={{ backgroundColor: formData.color }}
            >
              {formData.icon || "🏷️"}
            </div>
            <div>
              <div className="font-medium">{formData.name || "Tag Name"}</div>
              <code className="text-xs bg-default-100 px-2 py-1 rounded">
                {formData.slug || "slug"}
              </code>
            </div>
          </div>
          {formData.description && (
            <p className="text-sm text-default-600 mt-2 line-clamp-2">
              {formData.description}
            </p>
          )}
        </div>

        {/* 按钮组 */}
        <div className="flex gap-3 pt-2 border-t border-default-200">
          <Button
            className="flex-1"
            color="danger"
            variant="light"
            onPress={() => {
              if (isEdit) {
                setEditingTag(null);
              } else {
                setShowCreateForm(false);
              }
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button
            className="flex-1"
            color="primary"
            isDisabled={!formData.name || !formData.slug}
            isLoading={isCreating || isUpdating}
            onPress={isEdit ? handleUpdateTag : handleCreateTag}
          >
            {isEdit ? "Update Tag" : "Create Tag"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tag Management</h1>

          {/* 创建 Tag Popover */}
          <Popover
            isOpen={showCreateForm}
            offset={8}
            placement="bottom-end"
            onOpenChange={setShowCreateForm}
          >
            <PopoverTrigger>
              <Button color="primary" startContent={<PlusIcon />}>
                Create Tag
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <TagForm />
            </PopoverContent>
          </Popover>
        </div>

        {/* Tags Grid */}
        {isTagsLoading ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              <span>Loading tags...</span>
            </div>
          </div>
        ) : !tagsData?.content?.length ? (
          <div className="text-center py-8 text-default-500">
            No tags found. Click "Create Tag" to add your first tag.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tagsData.content.map((tag: Tag) => (
              <Card key={tag.tid} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full border border-default-200 flex items-center justify-center text-white font-semibold text-sm"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{tag.name}</h3>
                      <code className="text-xs bg-default-100 px-2 py-1 rounded">
                        {tag.slug}
                      </code>
                    </div>
                  </div>
                </div>

                {tag.description && (
                  <p className="text-sm text-default-600 mb-4 line-clamp-2">
                    {tag.description}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded border border-default-200"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-xs text-default-500">
                      {tag.color}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {/* 编辑 Popover */}
                    <Popover
                      isOpen={editingTag?.tid === tag.tid}
                      offset={8}
                      placement="bottom-end"
                      onOpenChange={(open) => {
                        if (!open) {
                          setEditingTag(null);
                          resetForm();
                        }
                      }}
                    >
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          startContent={<EditIcon />}
                          variant="light"
                          onPress={() => startEdit(tag)}
                        >
                          Edit
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-4">
                        <TagForm isEdit editingTag={editingTag} />
                      </PopoverContent>
                    </Popover>

                    {/* 删除 Popover */}
                    <Popover
                      isOpen={deletingTag?.tid === tag.tid}
                      offset={8}
                      placement="bottom-end"
                      onOpenChange={(open) => {
                        if (!open) {
                          setDeletingTag(null);
                        }
                      }}
                    >
                      <PopoverTrigger>
                        <Button
                          color="danger"
                          size="sm"
                          startContent={<SlashFillIcon />}
                          onPress={() => startDelete(tag)}
                        >
                          Delete
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-4 min-w-72">
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold mb-2">Delete Tag</p>
                            <p className="text-sm text-default-600">
                              Are you sure you want to delete the tag{" "}
                              <strong>"{deletingTag?.name}"</strong>?
                            </p>
                            <p className="text-xs text-default-500 mt-2">
                              This action cannot be undone.
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              color="default"
                              size="sm"
                              variant="light"
                              onPress={() => setDeletingTag(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              color="danger"
                              isLoading={isDeleting}
                              size="sm"
                              onPress={handleDeleteTag}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
